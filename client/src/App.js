//npm install gh-pages 
//"homepage":"https://ivanbkovacevic.github.io/vesalica", -ovo u jsonu
//"deploy":"npm run build&&gh-pages -d build",
//npm run deploy
import React, { Component } from 'react';
import './css/vesalica.css';
import axios from 'axios';
import firebase from './firebase';
import Vesalo from './Vesalo';
import LettersToBeGuessed from './LettersToBeGuessed';
import { Grid, Col, Row,Button } from 'react-bootstrap';

class App extends Component {

state={
  gameStarted:false,
  gradoviSrbije:{
    1:'AЛЕКСИНAЦ',2:'БЕОГРAД',3:'ДИМИТРОВГРAД',4:'НОВИ СAД',5:'ЗРЕЊАНИН',6:"ПAНЧЕВО",7:"ВРШAЦ",8:"ЧAЧAК",9:"КРAГУЈЕВАЦ",10:"НИШ",
    11:"КРУШЕВAЦ",12:"СУБОТИЦA",13:"БЕЧЕЈ",14:"КИКИНДA",15:"КРAЉЕВО",16:"ВAЉЕВО",17:"СМЕДЕРЕВО",18:"ПAРAЋИН",19:"ЛЕСКОВAЦ",20:"АПAТИН"
  },
  zagRec:'',
  showWord:false,
  zagRecLength:0,
  zagRecArr:[],
  zagRecArrChecking:[],
  correctLettArr:[],
  azbuka:[{id:0,value:"A",clicked:false},{id:1,value:"Б",clicked:false},{id:2,value:"В",clicked:false},{id:3,value:"Г",clicked:false},
  {id:4,value:"Д",clicked:false},{id:5,value:"Е",clicked:false},{id:6,value:"Ђ",clicked:false},{id:7,value:"Ж",clicked:false},
  {id:8,value:"З",clicked:false},{id:9,value:"И",clicked:false},{id:10,value:"Ј",clicked:false},{id:11,value:"К",clicked:false},
  {id:12,value:"Л",clicked:false},{id:13,value:"Љ",clicked:false},{id:14,value:"М",clicked:false},{id:15,value:"Н",clicked:false},
  {id:16,value:"Њ",clicked:false},{id:17,value:"О",clicked:false},{id:18,value:"П",clicked:false},{id:19,value:"Р",clicked:false},
  {id:20,value:"С",clicked:false},{id:21,value:"Т",clicked:false},{id:22,value:"У",clicked:false},{id:23,value:"Ф",clicked:false},
  {id:24,value:"Х",clicked:false},{id:25,value:"Ц",clicked:false},{id:26,value:"Ћ",clicked:false},{id:27,value:"Ч",clicked:false},
  {id:28,value:"Џ",clicked:false},{id:29,value:"Ш",clicked:false}],
  bingo:0,
  missed:0,
  letterG:'',
  notMatch:0,
  message:'',
  btnMsg:'START',
  status:'',
  gradoviFirebase:[],
  dataReady:false
  
}

generateWord=()=>{ // kreira rec...i kreira crtice za slova i pravi nekoliko arraya
  let {zagRec,zagRecLength,zagRecArr,correctLettArr,notMatch,zagRecArrChecking,gradoviSrbije,gameStarted,btnMsg}=this.state;
 
  if(!gameStarted){
    gameStarted=!gameStarted;
    btnMsg='RESETUJ';
    let gradoviLength=Object.keys(gradoviSrbije).length;
    console.log(gradoviLength);
    console.log(gradoviSrbije);
    let zagIndex= Math.floor(Math.random() * gradoviLength) + 1;
    zagRec=gradoviSrbije[zagIndex];
    console.log(zagRec);
    zagRecLength= zagRec.length;//du\ina nam treba da bismo proveravali da li je doslo do pobede ili poraza kao i za crtanje
    console.log( zagRecLength);
    zagRec=zagRec.toUpperCase();
    zagRecArr=  Array.from(zagRec);// pravljenje array od reci jer treba manipulisati sa tim array
    zagRecArrChecking=[...zagRecArr];//array koji sluzi za proveru da li su sva slova pogodjena tj.  registruje da li su sva slova(i duplikati) upisani
   
    for(let c in zagRecArr){ // loop koji proverava da li ima razmaka tj da li ima dve ili vise reci i izbacuje taj elemenat i smanjuje duzinu
      if(zagRecArr[c]===' '){// ovo mora jer inace ubacio bi ubacio crticu i na prayno mesto
       correctLettArr.push(' ');
       zagRecArrChecking.splice(c,1);
       zagRecLength--;
      }else{
       correctLettArr.push('_')
      }
    }
    this.setState({zagRec,zagRecLength,zagRecArr,correctLettArr,notMatch,zagRecArrChecking,gameStarted,btnMsg});
  }else{
    console.log('statrtovano');
    gameStarted=!gameStarted;
    this.setState({
      zagRec:'',
      gameStarted,
      showWord:false,
      zagRecLength:0,
      zagRecArr:[],
      zagRecArrChecking:[],
      correctLettArr:[],
      bingo:0,
      missed:0,
      letterG:'',
      atmLettArr:[],
      message:'',
      btnMsg:'NOVA REC',
      status:'',
      
    
      azbuka:[{id:0,value:"A",clicked:false},{id:1,value:"Б",clicked:false},{id:2,value:"В",clicked:false},{id:3,value:"Г",clicked:false},
      {id:4,value:"Д",clicked:false},{id:5,value:"Е",clicked:false},{id:6,value:"Ђ",clicked:false},{id:7,value:"Ж",clicked:false},
      {id:8,value:"З",clicked:false},{id:9,value:"И",clicked:false},{id:10,value:"Ј",clicked:false},{id:11,value:"К",clicked:false},
      {id:12,value:"Л",clicked:false},{id:13,value:"Љ",clicked:false},{id:14,value:"М",clicked:false},{id:15,value:"Н",clicked:false},
      {id:16,value:"Њ",clicked:false},{id:17,value:"О",clicked:false},{id:18,value:"П",clicked:false},{id:19,value:"Р",clicked:false},
      {id:20,value:"С",clicked:false},{id:21,value:"Т",clicked:false},{id:22,value:"У",clicked:false},{id:23,value:"Ф",clicked:false},
      {id:24,value:"Х",clicked:false},{id:25,value:"Ц",clicked:false},{id:26,value:"Ћ",clicked:false},{id:27,value:"Ч",clicked:false},
      {id:28,value:"Џ",clicked:false},{id:29,value:"Ш",clicked:false}],
    });
  }
  
}

GuessingLetter=(s,i)=>{ // igrac pogadja rec...
  let {letterG,zagRecArr,zagRecArrChecking,message,correctLettArr,bingo,zagRecLength,showWord,notMatch,missed,status,azbuka}=this.state;
  azbuka=azbuka.slice();
  zagRecArr=zagRecArr.slice();
  zagRecArrChecking=zagRecArrChecking.slice();
  correctLettArr=correctLettArr.slice();//array koji hvata tacna slova  tj pogotke
 
    letterG = s;//hvatanje slova iz arraya
    letterG=letterG.toUpperCase();
    azbuka[i].clicked=true;
    this.setState({azbuka});
    
    for(let w in zagRecArr ){ //prolazenje kroz arr reci i cekiranje da li se neki elemenat arr poklapa sa guessovanim slovom
      if(zagRecArr[w]===letterG){
        correctLettArr[w]=letterG;//correctLettArr sluzi za ispisivanje pogodjenih slova....mo\da je moglo da se nayove i displayedLettArr
        message='Pogodili ste slovo';
        this.setState({correctLettArr,message});
      } 
  }

  for(let ww in zagRecArrChecking ){ //cekiranje pogodatak i dobijanje da li pobeda ili ne
    if(zagRecArrChecking[ww]===letterG){
      zagRecArrChecking.splice(ww,1); // zagRecArrChecking sluzi za proveru da li je pronadjena zagonetna rec...taj array se smanjuje...izbacuju se pogodjena slova i dodaje se po poen u bingo 
      bingo++;
      this.setState({zagRecArrChecking,bingo});
    } 
}

  this.checkSlovo=(slovo)=>{ // funkcija koja vraca true ili false u zavisnsoti od uslova
    return slovo !== letterG;
   }

   notMatch=zagRecArr.every(this.checkSlovo);//primenjivanje gornje funkcije na svaki elemenat u nizu
     if(notMatch){//ako je true dodavanje poena u missed  i ispisavanje poruke
       message='Nema tog slova u reci !';
       missed++
       this.setState({message,missed})
     }
      if(bingo===zagRecLength){ //pronaslo se tacno resenje 
        message='BRAVO! Nasli ste tacnu rec.';
        status='-win';
        this.setState({message,status})
      }

      if(missed===6 ){ //missed se dobija kada slovo nije matchovano
        message='IZGUBILI STE PARTIJU';
        status='-loss';
        showWord=true;
        this.setState({message,status,showWord})
      }

    this.setState({letterG})
}

upisiGradUBazu=(e)=>{
  e.preventDefault() ;
   let imeGrada=this.refs.grad.value;
   let hobbyName=this.refs.hobby.value;
   let payload={
     name:imeGrada,
     hobby:hobbyName}
   e.target.reset();
    axios.post('/api/items',payload)
  .then(response=>console.log(response))
  .catch(error=>console.log(error));
console.log(imeGrada)
}

uzmiGradIzBaze=()=>{
  let {gradoviFirebase}=this.state;
  gradoviFirebase=gradoviFirebase.slice();
  gradoviFirebase=[];
 // axios.get('https://vesalica-caf53.firebaseio.com/gradovi_srbije/.json')
  axios.get('/api/items')
  .then(response=>{
    console.log(response.data)
    for(let i in response.data){
      gradoviFirebase.push(response.data[i].ime)
    }
      console.log(gradoviFirebase)
    this.setState({gradoviFirebase,dataReady:true});
  
  })
}

////////////////////////////////////////////////////////////////////////////////////////////
  render() {
   let {status,correctLettArr}=this.state;
   let correct=null;
   let abc=null;
   let fire=null;
   
    correct=correctLettArr.map((l,i)=>{
      return <span className='crtice'>{l}</span>
    })

    abc=(
      this.state.azbuka.map((slo,i)=>{
      return (<LettersToBeGuessed isUsed={slo.clicked} value={slo.value} clicked={()=>this.GuessingLetter(slo.value,i)}/>
        )
    })
  )

   if(this.state.dataReady){
    fire=this.state.gradoviFirebase.map((gr,i)=>{
      return <p key={i}>{gr}</p>
    })  
   }
  
    return (
      <Grid >
        <Row>
          <Col xs={4}><button className="btnmoj" onClick={this.generateWord}>{this.state.btnMsg}</button></Col>  
        </Row>

        <Row>
          <div className='zag-rec-container'>
              {this.state.showWord ? <div className="letters">Zagonetna reč je bila: {this.state.zagRec}</div> : null} 
              <Col xs={12}><span className="letters-zagonetka">{correct}</span></Col>
          </div>
        </Row>
    <Row>
    <Col xs={12}> 
    { this.state.gameStarted ? <div>{abc}</div> : null }
    </Col>
     
    </Row>
    <Row>
    <Col xs={12}> 
       <div className={`message${status}`}>{this.state.message}</div>
    </Col>
  
    </Row>
    <Row>
      <Vesalo missed={this.state.missed}/>

      <form onSubmit={this.upisiGradUBazu}>
        <input type="text" ref='grad' />
        <input type="text" ref='hobby' />
        <button type='submit'>upisi grad</button>
      </form>
      <button type='text' onClick={this.uzmiGradIzBaze}>uzmi gradove</button>
     {fire}
     
    </Row>

      </Grid>
    );
  }
}

export default App;
