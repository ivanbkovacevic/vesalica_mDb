//npm install gh-pages 
//"homepage":"https://ivanbkovacevic.github.io/vesalica", -ovo u jsonu
//"deploy":"npm run build&&gh-pages -d build",
//npm run deploy
import React, { Component } from 'react';
import './css/vesalica.css';
import axios from 'axios';
import Vesalo from './Vesalo';
import LettersToBeGuessed from './LettersToBeGuessed';
import { Grid, Col, Row } from 'react-bootstrap';

class App extends Component {

  state = {
    gameStarted: false,
    azbuka:true,
    isSerbianCity:true,
   
    worldCityArr:[],
    serbianCityArr:[],
    mysteryCityArr:[],

    mysteryWord: '',
    showWord: false,
    mysteryWordLength: 0,
    mysteryWordArr: [],
    mysteryWordArrChecking: [],
    correctLettArr: [],
    azbuka: [{ id: 30, value: "А", clicked: false }, { id: 1, value: "Б", clicked: false }, { id: 2, value: "В", clicked: false }, { id: 3, value: "Г", clicked: false },
    { id: 4, value: "Д", clicked: false }, { id: 5, value: "Е", clicked: false }, { id: 6, value: "Ђ", clicked: false }, { id: 7, value: "Ж", clicked: false },
    { id: 8, value: "З", clicked: false }, { id: 9, value: "И", clicked: false }, { id: 10, value: "Ј", clicked: false }, { id: 11, value: "К", clicked: false },
    { id: 12, value: "Л", clicked: false }, { id: 13, value: "Љ", clicked: false }, { id: 14, value: "М", clicked: false }, { id: 15, value: "Н", clicked: false },
    { id: 16, value: "Њ", clicked: false }, { id: 17, value: "О", clicked: false }, { id: 18, value: "П", clicked: false }, { id: 19, value: "Р", clicked: false },
    { id: 20, value: "С", clicked: false }, { id: 21, value: "Т", clicked: false }, { id: 22, value: "У", clicked: false }, { id: 23, value: "Ф", clicked: false },
    { id: 24, value: "Х", clicked: false }, { id: 25, value: "Ц", clicked: false }, { id: 26, value: "Ћ", clicked: false }, { id: 27, value: "Ч", clicked: false },
    { id: 28, value: "Џ", clicked: false }, { id: 29, value: "Ш", clicked: false }],

    abeceda: [{ id: 30, value: "A", clicked: false }, { id: 1, value: "B", clicked: false }, { id: 2, value: "C", clicked: false }, { id: 3, value: "D", clicked: false },
    { id: 4, value: "E", clicked: false }, { id: 5, value: "F", clicked: false }, { id: 6, value: "G", clicked: false }, { id: 7, value: "H", clicked: false },
    { id: 8, value: "I", clicked: false }, { id: 9, value: "J", clicked: false }, { id: 10, value: "K", clicked: false }, { id: 11, value: "L", clicked: false },
    { id: 12, value: "M", clicked: false }, { id: 13, value: "N", clicked: false }, { id: 14, value: "O", clicked: false }, { id: 15, value: "P", clicked: false },
    { id: 16, value: "Q", clicked: false }, { id: 17, value: "R", clicked: false }, { id: 18, value: "S", clicked: false }, { id: 19, value: "T", clicked: false },
    { id: 20, value: "U", clicked: false }, { id: 21, value: "V", clicked: false }, { id: 22, value: "W", clicked: false }, { id: 23, value: "X", clicked: false },
    { id: 24, value: "Y", clicked: false }, { id: 25, value: "Z", clicked: false }, { id: 26, value: "Ć", clicked: false }, { id: 27, value: "Č", clicked: false },
    { id: 28, value: "Š", clicked: false }, { id: 29, value: "Đ", clicked: false }],
    bingo: 0,
    missed: 0,
    letterG: '',
    notMatch: 0,
    message: '',
    btnMsg: 'START',
    status: '',
    dataReady: false
  }

  // initial mysteryWord making with lines
  generateWord = () => {
    let { mysteryWord, mysteryWordLength, mysteryWordArr,correctLettArr, notMatch, mysteryWordArrChecking, mysteryCityArr,  gameStarted, btnMsg } = this.state;

    if (!gameStarted) {
      gameStarted = !gameStarted;
      btnMsg = 'RESETUJ';
      let cityesLength = mysteryCityArr.length;
      console.log(cityesLength);
      console.log(mysteryCityArr);
      //geting the index so can  randomly search for a word
      let mysteryIndex = Math.floor(Math.random() * cityesLength) + 1;
      mysteryWord = mysteryCityArr[mysteryIndex];
      console.log(mysteryWord);
      //we need word length so we can check is it win or loss and to draw lines
      mysteryWordLength = mysteryWord.length;

      console.log(mysteryWordLength);
      mysteryWord = mysteryWord.toUpperCase();
      // making array od letters of mysteryWord so we can manipulated with that
      mysteryWordArr = Array.from(mysteryWord);
      //array wich we use to check are all letters guessed and also duplicates
      mysteryWordArrChecking = [...mysteryWordArr];

      // loop which we check is there a empty space in mysteryWord and pop that element so we have correct array length for checking the hits
      for (let c in mysteryWordArr) {
        // if we do not have this...the lines will be on empty par of the word and we do not wanth that
        if (mysteryWordArr[c] === ' ') {
          correctLettArr.push(' ');
          mysteryWordArrChecking.splice(c, 1);
          mysteryWordLength--;
        } else {
          correctLettArr.push('_')
        }
      }
      this.setState({ mysteryWord, mysteryWordLength, mysteryWordArr, correctLettArr, notMatch, mysteryWordArrChecking, gameStarted, btnMsg });
    } else {
      console.log('statrtovano');
      gameStarted = !gameStarted;
      this.setState({
        mysteryWord: '',
        gameStarted,
        showWord: false,
        mysteryWordLength: 0,
        mysteryWordArr: [],
        mysteryWordArrChecking: [],
       // mysteryCityArr:[],
        correctLettArr: [],
        bingo: 0,
        missed: 0,
        letterG: '',
        atmLettArr: [],
        message: '',
        btnMsg: 'NOVA REC',
        status: '',
        azbuka: [{ id: 30, value: "А", clicked: false }, { id: 1, value: "Б", clicked: false }, { id: 2, value: "В", clicked: false }, { id: 3, value: "Г", clicked: false },
        { id: 4, value: "Д", clicked: false }, { id: 5, value: "Е", clicked: false }, { id: 6, value: "Ђ", clicked: false }, { id: 7, value: "Ж", clicked: false },
        { id: 8, value: "З", clicked: false }, { id: 9, value: "И", clicked: false }, { id: 10, value: "Ј", clicked: false }, { id: 11, value: "К", clicked: false },
        { id: 12, value: "Л", clicked: false }, { id: 13, value: "Љ", clicked: false }, { id: 14, value: "М", clicked: false }, { id: 15, value: "Н", clicked: false },
        { id: 16, value: "Њ", clicked: false }, { id: 17, value: "О", clicked: false }, { id: 18, value: "П", clicked: false }, { id: 19, value: "Р", clicked: false },
        { id: 20, value: "С", clicked: false }, { id: 21, value: "Т", clicked: false }, { id: 22, value: "У", clicked: false }, { id: 23, value: "Ф", clicked: false },
        { id: 24, value: "Х", clicked: false }, { id: 25, value: "Ц", clicked: false }, { id: 26, value: "Ћ", clicked: false }, { id: 27, value: "Ч", clicked: false },
        { id: 28, value: "Џ", clicked: false }, { id: 29, value: "Ш", clicked: false }]
      });
    }

  }
  // player is guessing the word
  GuessingLetter = (s, i) => {
    let { letterG, mysteryWordArr, mysteryWordArrChecking, message, correctLettArr, bingo, mysteryWordLength, showWord, notMatch, missed, status, azbuka } = this.state;
  
    mysteryWordArr = mysteryWordArr.slice();
    mysteryWordArrChecking = mysteryWordArrChecking.slice();
    //array that catches the correct hits
    correctLettArr = correctLettArr.slice();

    //catching the letters from the buttons
    letterG = s;
    letterG = letterG.toUpperCase();
    azbuka[i].clicked = true;
    this.setState({ azbuka });

    //here we are going trough array od mysteryWord and we are checking is some element is same as letterG
    for (let w in mysteryWordArr) { 
      if (mysteryWordArr[w] === letterG) {

        //correctLettArr is used for displaying the correct hits
        correctLettArr[w] = letterG;
        message = 'Pogodili ste slovo';
        this.setState({ correctLettArr, message });
      }
    }

    //checking is a correct hit and ading points so we can se is is guessed complitly
    for (let ww in mysteryWordArrChecking) { 
      if (mysteryWordArrChecking[ww] === letterG) {

        // mysteryWordArrChecking is used for checking is it hole mysteryWord find...this array is shrinking...
        //the elements are poping and adding poits in to a bingo 
        mysteryWordArrChecking.splice(ww, 1); 
        bingo++;
        this.setState({ mysteryWordArrChecking, bingo });
      }
    }

    // funktion wich returning true or false 
    this.checkSlovo = (slovo) => { 
      return slovo !== letterG;
    }

    //checking is it hit or not on every place in array
    notMatch = mysteryWordArr.every(this.checkSlovo);
    if (notMatch) {
      message = 'Nema tog slova u reci !';
      missed++
      this.setState({ message, missed })
    }
    if (bingo === mysteryWordLength) { //mysteryWord find
      message = 'BRAVO! Nasli ste tacnu rec.';
      status = '-win';
      this.setState({ message, status })
    }

    if (missed === 6) { //player loose the game
      message = 'IZGUBILI STE PARTIJU';
      status = '-loss';
      showWord = true;
      this.setState({ message, status, showWord })
    }

    this.setState({ letterG })
  }

  insertCityesInMongo = (e) => {
    
    e.preventDefault();
    let cityName = this.refs.city.value;
    let countryName = this.refs.country.value;
    let continentName = this.refs.continent.value;
    let payload = {
      city: cityName,
      country: countryName,
      continent: continentName
    }
    e.target.reset();

    axios.post('/api/items', payload)
      .then(response => console.log(response))
      .catch(error => console.log(error));
    console.log(payload)
  }

  componentDidMount() {
    //getting the initial date from a server
    let { mysteryCityArr,worldCityArr, serbianCityArr,isSerbianCity } = this.state;
    mysteryCityArr = mysteryCityArr.slice();
   
    axios.get('/api/items')
      .then(response => {
        console.log(response.data)
        for (let i in response.data) {
         if(response.data[i].country==='србија' ){
      //selecting data for serbian cityes
          serbianCityArr.push(response.data[i].city);
          mysteryCityArr=[...serbianCityArr];

         }else if(response.data[i].country!=='србија' ){
          worldCityArr.push(response.data[i].city);
           //selecting data for world cityes
         }
        }

        this.setState({ mysteryCityArr,worldCityArr,serbianCityArr, dataReady: true });
        console.log(mysteryCityArr)
        console.log(mysteryCityArr+'mystery')
      })
  }

  isSerbianCityCheck=()=>{
    //switch button function for changing to serbian  cityes
    let {isSerbianCity,mysteryCityArr,serbianCityArr}=this.state;
    isSerbianCity=true;
    mysteryCityArr=mysteryCityArr.slice();
    mysteryCityArr=[...serbianCityArr];

   this.setState({isSerbianCity,mysteryCityArr})
  }

  isWorldCityCheck=()=>{
     //switch button function for changing to world  cityes
    let {isSerbianCity,mysteryCityArr,worldCityArr}=this.state;
    isSerbianCity=false;
    mysteryCityArr=mysteryCityArr.slice();
    mysteryCityArr=[...worldCityArr];
    this.setState({isSerbianCity,mysteryCityArr})
  }
  

  ////////////////////////////////////////////////////////////////////////////////////////////
  render() {
    let { status, correctLettArr } = this.state;
    let correct = null;
    let abv = null;
    let abc = null;
    let fire = null;

    correct = correctLettArr.map((l,i) => {
      return <span key={i} className='crtice'>{l}</span>
    })

    abv = (
      this.state.azbuka.map((slo, i) => {
        return (<LettersToBeGuessed key={i} isUsed={slo.clicked} value={slo.value} clicked={() => this.GuessingLetter(slo.value, i)} />
        )
      })
    )

    abc = (
      this.state.abeceda.map((slo, i) => {
        return (<LettersToBeGuessed key={i} isUsed={slo.clicked} value={slo.value} clicked={() => this.GuessingLetter(slo.value, i)} />
        )
      })
    )
    let serbianActiveClass=null;
    let worldActiveClass=null;
    this.state.isSerbianCity ? serbianActiveClass="btnmoj-active" : serbianActiveClass="btnmoj" ;
    this.state.isSerbianCity ? worldActiveClass="btnmoj" : worldActiveClass="btnmoj-active" ;
  

    return (
      
      <Grid >
        <Row>
          <Col xs={6}><button className="btnmoj" onClick={this.generateWord}>{this.state.btnMsg}</button></Col>
          <Col xs={3}><button className={serbianActiveClass}  onClick={this.isSerbianCityCheck}>Градови Србије</button></Col>
  
          <Col xs={3}><button className={worldActiveClass} onClick={this.isWorldCityCheck}>Gradovi Sveta</button></Col>
        </Row>

        <Row>
          <div className='zag-rec-container'>
            {this.state.showWord ? <div className="letters">Zagonetna reč je bila: {this.state.mysteryWord}</div> : null}
            <Col xs={12}><span className="letters-zagonetka">{correct}</span></Col>
          </div>
        </Row>
        <Row>
          <Col xs={12}>
            {this.state.gameStarted && this.state.isSerbianCity ? <div className='btnmoj-container'>{abv}</div> : null}
            {this.state.gameStarted && !this.state.isSerbianCity ?  <div className='btnmoj-container'>{abc}</div> : null}
          </Col>

        </Row>
        <Row>
          <Col xs={12}>
            <div className={`message${status}`}>{this.state.message}</div>
          </Col>

        </Row>
        <Row>
          <Vesalo missed={this.state.missed} />

       <form onSubmit={this.insertCityesInMongo}>
        <input type="text" placeholder="city" ref='city' />
        <input type="text" placeholder="country" ref='country' />
        <input type="text" placeholder="continent" ref='continent' />
        <button type='submit'>upisi grad</button>
      </form>
       <button type='text' onClick={this.takeCityes}>uzmi gradove</button> 
      

        </Row>

      </Grid>
    );
  }
}

export default App;
