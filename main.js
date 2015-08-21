//variables for the XOR table/
var inputs_xor=[[0,0],[0,1],[1,0],[1,1]];
var expected_ouputs=[0,1,1,0];
var umbral=0.5;
var signo_values=[];

//function that generates two values for the w's
function generate_w(){
  var weights=[];
  for(i=0; i< 2; i++){
    weights[i]=Math.random();
  }
  return weights;
}

//function that calculates the signoidal
function calculate_signoidal(z){
  return 1/(1+Math.exp(-z));
}

//function able to calculate the error function, it will be used for the final sum
function calculate_error(){
  var final_sum=0;
  for(i=0; i<expected_ouputs.length; i++){
    final_sum+=(Math.pow(signo_values[i]-expected_ouputs[i],2));
  }
  return final_sum;
}
//function able to calculate weights with x's
function init(){
  var wei=generate_w();
  for(i=0; i<expected_ouputs.length; i++){
    signo_values.push(calculate_signoidal((inputs_xor[i][0]*wei[0])+(inputs_xor[i][1]*wei[1])));
  }
  calculate_error();
}

//Initialize main
init();
//
