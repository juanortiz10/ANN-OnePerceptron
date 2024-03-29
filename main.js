//variables for the XOR table/
var inputs_xor=[[0,0],[0,1],[1,0],[1,1]],expected_ouputs=[0,1,1,0],signo_values=[];
var final_errors=[], ouput_of_weight=[],final_ouputs=[];

//function that generates two values for the w's
function generate_w(){
  var weights=[];
  for(i=0; i< 2; i++){
    weights[i]=Math.random();
  }
  return weights;
}

//function that calculates the sigmoidal
function calculate_sigmoidal(z){
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

function calculate(){
  var wei=generate_w();
  for(i=0; i<expected_ouputs.length; i++){
    signo_values.push(calculate_sigmoidal((inputs_xor[i][0]*wei[0])+(inputs_xor[i][1]*wei[1])));
    ouput_of_weight.push(calculate_sigmoidal((inputs_xor[i][0]*wei[0])+(inputs_xor[i][1]*wei[1])));
  }
}


function init(){
  calculate();
  if(final_errors.length<2){
    final_errors.push(calculate_error());
    signo_values.length=0; ouput_of_weight.length=0;
    init();
  }else {
    var count0=0, count1=0;
    while (!(count0==100|| count1==100)) {
      if (final_errors[1] < final_errors[0]){
              final_errors.splice(0,1);
              console.log("Error Function ",final_errors);
              signo_values.length=0; ouput_of_weight.length=0;
              calculate();
              final_errors.splice(0,0,calculate_error());
              count1++; count0=0;
      }else{
              final_errors.splice(1,1);
              console.log("Error Function ",final_errors);
              final_ouputs.length=0; signo_values.length=0;
              ouput_of_weight.length=0;
              calculate();
              final_errors.splice(1,0,calculate_error());
              count0++; count1=0;
      }
    }
  }
  final_ouputs.length=0;
}
//Initialize main
init();
console.log("Ouputs: ",ouput_of_weight);