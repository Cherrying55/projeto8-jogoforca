import palavras from './palavras';
import { useEffect, useState } from 'react';
import React from 'react';
import Chute from './Chute';
import Letras from './Letras';
import forca0 from './assets/forca0.png';
import forca1 from './assets/forca1.png';
import forca2 from './assets/forca2.png';
import forca3 from './assets/forca3.png';
import forca4 from './assets/forca4.png';
import forca5 from './assets/forca5.png';
import forca6 from './assets/forca6.png';

const Jogo = () => {
    let forcas = [forca0, forca1, forca2, forca3, forca4, forca5, forca6]
    const [counter, setCounter] = useState(0);
    const [palavra, setPalavra] = useState([]);
    const [acertadas, setAcertadas] = useState([]);
    const [lose, setLose] = useState("naocomeçou");
    const [clicadas, setClicadas] = useState([]);

    function comparador() { 
        return Math.random() - 0.5; 
    }

    function selecionarletra(e){
        if(!clicadas.includes(e.target.textContent)){
            setClicadas([...clicadas, e.target.textContent])
            console.log(clicadas);
        }
        //for in if value 
        if(!palavra.includes(e.target.textContent)){
           setCounter(counter + 1);
       }
       else{
        if(!acertadas.includes(e.target.textContent)){
            setAcertadas([...acertadas, e.target.textContent]);
        }
       };
    }

    useEffect(() => {
        if(counter === 6){
            setAcertadas([...palavra]);
            setLose("perdeu");
           }
        }
    , [counter])

    useEffect(() => {
        let win = [];
        for(const i of palavra){
            if(acertadas.includes(i) && counter <6){
                 win.push(i);
            }
        }
        if(win.length === palavra.length && lose !=="naocomeçou"){
            setLose("venceu");
        }
    }, [acertadas])

    function escolher(e){
        let a = [...palavras];
      a = a.sort(comparador);
       let palavra1 = a[0];
       let parsed = palavra1.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '');
       parsed = parsed.toUpperCase();
       parsed.split("");
       setPalavra([...parsed]);
       setAcertadas([]);
       setLose("jogando");
       setCounter(0);
       setClicadas([]);
       // if palavra != "";
    }
    

    return(<><div className="forcawrapper">
        <img src={forcas[counter]}/>
        <div className="escolherepalavra">
            <button className="escolherbotao" onClick={escolher}>
                Escolher Palavra
            </button>
            <div class="escolhas">
                {palavra.map((letra) => {
                   let a = <div className={lose === "perdeu" ? "perdeu" : (lose === "venceu" ? "venceu" : "jogando")}>_</div>
                   if(acertadas.includes(letra)){
                        a = <div className={lose}>{letra.toLowerCase()}</div>
                    }
                    return a;
                })}
            </div>
        </div>
    </div>
           <Letras funçao={selecionarletra} clicadas={clicadas} lose={lose}/>
           <Chute palavra={palavra} lose={lose} setLose={setLose} setAcertadas={setAcertadas} acertadas={acertadas} setCounter={setCounter}/>
           </>)
}

export default Jogo;