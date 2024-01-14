pragma circom 2.0.0;

/*This circuit template checks that c is the multiplication of a and b.*/  

template LessThan(n) {
    assert(n <= 252);
    signal input in[2];
    signal output out;

    component n2b = Num2Bits(n+1);

    n2b.in <== in[0]+ (1<<n) - in[1];

    out <== 1-n2b.out[n];
}

template Num2Bits(n) {
    signal input in;
    signal output out[n];
    var lc1=0;

    var e2=1;
    for (var i = 0; i<n; i++) {
        out[i] <-- (in >> i) & 1;
        out[i] * (out[i] -1 ) === 0;
        lc1 += out[i] * e2;
        e2 = e2+e2;
    }

    lc1 === in;
}

template Computation2 () {  

   // Declaration of signals.  
   signal input totalBorrowed;  
   signal input totalRepaid;
   signal input openPositions;  
   signal input closedPositions;
   signal input liquidationCount;
     
    signal delta;
    signal delta1;
    signal gamma2;
    signal gamma1;
    signal lambda;
    signal gamma;
   signal  score1;
   signal  score3;
   signal  score2;
   signal output score;
     


   // Constraints.  
    var w1 = 3;
    var w2 = 8;
    var w3 = 1;

    delta1 <==  ((totalRepaid - totalBorrowed)* 1000);
    delta <-- delta1\totalRepaid;
    delta*totalRepaid === delta1;
    gamma1 <== closedPositions*1000;
    gamma2 <-- gamma1\(openPositions+closedPositions);
    (openPositions+closedPositions)*gamma2 === gamma1; 

    lambda <== liquidationCount * liquidationCount;
    // gamma <== gamma2;

    score1 <== w2*gamma2 ;
    score2 <== w1*delta;
    score3 <== w3*lambda; 

    component lt = LessThan(252);
    lt.in[0] <== score1;
    lt.in[1] <== (score2+score3);
  	signal scorex;
  	scorex <== lt.out*(score2+score3-score1);
    score  <== scorex + (1 - lt.out)*(score1 - score2 - score3);

   }

 component main {public [ totalBorrowed, totalRepaid, openPositions, closedPositions, liquidationCount ]}  = Computation2();


