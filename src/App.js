import React, { Component } from 'react';
import './App.css';
import $ from 'jquery'; 

let logo = 'http://dl.kano.me/tech-test/Logo.svg';

let obj = {
    src: 'http://dl.kano.me/tech-test/Logo.svg',
    text: "Latest 100 Shares"
}

let bodyObj = {
    text: "To get started, edit src/App.js po and save to reload."
}

class Header extends Component {
    render() {
        return (

            <header className="App-header">
                <img src={this.props.src} className="App-logo" alt="logo" />
                <h1 className="App-title">{this.props.text}</h1>
            </header>

        )

    }

}


class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      entries: []
    };
  }

  componentDidMount() {
    fetch("http://api.kano.me/share?limit=100")
      .then(res => res.json())
      .then((result) => {
          console.log(result)
          this.setState({
            isLoaded: true,
            entries: result.entries
          });
        }, (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, entries } = this.state;
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {

        let slides = [];

        console.log(entries)

        for (var i = 0; i < entries.length; i++) {slides.push(<Slide image={entries[i].cover_url}title={entries[i].title} name={"by "+entries[i].user.username} likes={entries[i].likes.length} order={i}/>);}

        return slides;

    }

  }

}

var poop = true;

class Fuck extends Component {
    render() {
        return (
            
            <div className="App-light-box">
                <div>{console.log(this.props)}</div>
            </div>

        )
    }
}

class Slide extends Component {
 constructor(props) {
        
        super(props);
        this.state = {showComponent: false};
        this._onButtonClick = this._onButtonClick.bind(this);
    }
    _onButtonClick = () => {
        
        this.setState({showComponent: true});

        console.log("front end work is extremly boring and un-challenging")
    }

    render() {
        return (

            <div className="App-slide" order={this.props.order} onClick={this._onButtonClick}>
            {this.state.showComponent ? console.log('poop'):null}
                <img src={this.props.image} />
                <div className="title"> {this.props.title}</div>
                <div className="userName">{this.props.name}</div>
                <div className="likes">
                    <img src="http://dl.kano.me/tech-test/KANO-ICONS-HEART.svg" /> 
                    <p className="numberLikes">{this.props.likes}</p>
                    <p>likes</p>
                </div>
            </div>
        )
    }
}
$.expr[':'].icontains = $.expr.createPseudo(function(text) {
    return function(e) {
        return $(e).text().toUpperCase().indexOf(text.toUpperCase()) >= 0;
    };
});

class Search extends Component {
 
    handleInputChange = () => {

        let matches = $(".App-slide .title:icontains('"+this.search.value+"')")

        $(".App-slide .title:not(:icontains('"+this.search.value+"'))").parent().css("display","none");

        matches.parent().css("display", "block");

        !matches.length?$(".App-no-result").show():$(".App-no-result").hide();

    }

    render() {
        return (
            <form>
               <input
                    placeholder="Search for..."
                    ref={input => this.search = input}
                    type="text"
                    onChange={this.handleInputChange}
               />
            </form>
        )
    }
}

function sortUsingNestedText(parent, childSelector, keySelector) {
    var items = parent.children(childSelector).sort(function(a, b) {
        var vA = $(keySelector, a).text();
        var vB = $(keySelector, b).text();
        return (vA > vB) ? -1 : (vA < vB) ? 1 : 0;
    });
    parent.append(items);
}

class Time extends Component {
    
    handleClick = () => {
        
        console.log('here')    
        
        if(!$(".filter p:nth-of-type(1)").hasClass("special")){
            $(".filter p").removeClass("special")
            $(".filter p:nth-of-type(1)").addClass("special")
            $(".App-slide").sort((a,b)=>{
                return (parseInt($(b).attr("order"))) < parseInt(($(a).attr("order"))) ? 1 : -1;
            }).appendTo('.Slide-holder');
            
        }

    }

    render(){
        return(<p onClick={this.handleClick}>TIME</p>)
    }

}

class Likes extends Component {
    
    handleClick = () => {

        console.log($(".filter p:nth-of-type(2)").hasClass("special"))
        if(!$(".filter p:nth-of-type(2)").hasClass("special")){

            $(".filter p").removeClass("special")
            $(".filter p:nth-of-type(2)").addClass("special")

            $('.Slide-holder').children("div").sort((a, b)=> {
                var vA = $(".numberLikes", a).text();
                var vB = $(".numberLikes", b).text();
                return (vA > vB) ? -1 : (vA < vB) ? 1 : 0;
            }).appendTo('.Slide-holder')

        }

    }

    render(){
        return(<p onClick={this.handleClick}>LIKES</p>)

    }

}


class Title extends Component {
    
    handleClick = () => {
        
        if(!$(".filter p:nth-of-type(3)").hasClass("special")){

            $(".filter p").removeClass("special")
            $(".filter p:nth-of-type(3)").addClass("special")

            $(".Slide-holder").children().detach().sort((a, b)=> {
                return $(a).text().localeCompare($(b).text());
            }).appendTo('.Slide-holder');

        }

    }

    render(){
        return(<p onClick={this.handleClick}>TITLE</p>)
    }

}


class Body extends Component {

    render(){
        return (

            <div className="App-search">

                <Search />
                <div className="filter">
                    <Time />
                    <Likes />
                    <Title />
                    
                </div>
            </div>

        )

    }

}




class App extends Component {
    
    render() {
        
        return (
            
            <div className="App">

                <Header src={obj.src} text={obj.text} />
                
                <Body text={bodyObj.text} />
                <div className="Slide-holder">
                    <MyComponent />
                    <div className="App-no-result"><p>No results found. Please try another search</p></div>
                </div>

            </div>

        );
    }
}







export default App;


