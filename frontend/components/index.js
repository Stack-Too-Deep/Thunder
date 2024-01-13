import {
    useState,
    useEffect,
} from 'react';

import { toast } from 'react-toastify';
import React from 'react';

import { Noir } from '@noir-lang/noir_js';
import { BarretenbergBackend, flattenPublicInputs } from '@noir-lang/backend_barretenberg';
import { CompiledCircuit, ProofData } from '@noir-lang/types';
import { compile } from '@noir-lang/noir_wasm';

// @ts-ignore
import { initializeResolver } from '@noir-lang/source-resolver';
import { bytesToHex } from 'viem';

export function Component() {

    const [input, setInput] = useState({ x: 0, y: 0 });
    const [proof, setProof] = useState();
    const [noir, setNoir] = useState(null);
    const [backend, setBackend] = useState(null);

    const { isConnected } = useAccount();
    const { connect, connectors } = useConnect();

    const { write, data, error, isLoading, isError } = useContractWrite({
        ...contractCallConfig,
        functionName: 'verify',
    });

    const initNoir = async () => {
        const circuit = await getCircuit('main');
        const backend = new BarretenbergBackend(circuit.program, { threads: 8 });
        setBackend(backend);
        const noir = new Noir(circuit.program, backend);
        await toast.promise(noir.init(), {
            pending: 'Initializing Noir...',
            success: 'Noir initialized!',
            error: 'Error initializing Noir',
        });
        setNoir(noir);
    };

    useEffect(() => {
        initNoir();
    }, []);


    async function getCircuit(name) {
        const res = await fetch(new URL('../../circuit/src/main.nr', import.meta.url));
        const noirSource = await res.text();

        initializeResolver((id) => {
            const source = noirSource;
            return source;
        });

        const compiled = compile('main');
        return compiled;
    }

    // TODO :- Handle input changes


    const verifyProof = async () => {
        const verifyOffChain = new Promise(async (resolve, reject) => {
            if (proof) {
                const verification = await noir.verifyFinalProof({
                    proof: proof.proof,
                    publicInputs: proof.publicInputs,
                });
                console.log('Proof verified: ', verification);
                resolve(verification);
            }
        });

        toast.promise(verifyOffChain, {
            pending: 'Verifying proof off-chain...',
            success: 'Proof verified off-chain!',
            error: 'Error verifying proof',
        });

        connectors.map(c => c.ready && connect({ connector: c }));

        if (proof) {
            write?.({
                args: [bytesToHex(proof.proof), flattenPublicInputs(proof.publicInputs)],
            });
        }
    };
};

useEffect(() => {
    if (proof) {
        verifyProof();
        return () => {
            backend.destroy();
        };
    }
}, [proof]);

useEffect(() => {
    if (data) toast.success('Proof verified on-chain!');
}, [data]);


// Calculates proof
const calculateProof = async () => {
    const calc = new Promise(async (resolve, reject) => {
        const { proof, publicInputs } = await noir.generateFinalProof(input);
        console.log('Proof created: ', proof);
        setProof({ proof, publicInputs });
        resolve(proof);
    });
    toast.promise(calc, {
        pending: 'Calculating proof...',
        success: 'Proof calculated!',
        error: 'Error calculating proof',
    });
};
