const d=document,
        $main =d.querySelector('main'),
        $links=d.querySelector('.links');
        let pokeAPI="https://pokeapi.co/api/v2/pokemon/";


        async function loadPokemons(url){
            try{
                $main.innerHTML = `<div class="loaded" >  <img class="rotated"  src="./pokeball.png" alt="Cargando..."> <br/> Icons made by <a href="https://www.flaticon.com/authors/nikita-golubev" title="Nikita Golubev">Nikita Golubev </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> `
                let res = await fetch(url),
                 json= await res.json(),
                 $template= "",
                 $prevLink,
                 $nextLink; 
                 console.log(json);
                if (!res.ok) throw {
                    status: res.status,
                    statusText:res.statusText
                }

                for (let i=0; i<json.results.length;i++){
                   
                   try {
                    let resp= await fetch(json.results[i].url),
                     pokemon= await resp.json();
                     var tipo=pokemon.types;
                     if (i===4){console.log(pokemon.types);
                        $template+= `
                        <figure  class="targeta">
                            <img src=${pokemon.sprites.other.dream_world.front_default} alt=${pokemon.name}>
                            <p><h3> ${pokemon.name} </h3></p>
                            <p> ${tipo[0].type.name}</p>
                        </figure>`
                    } else{

                     $template+= `
                        <figure  class="targeta">
                            <img src=${pokemon.sprites.front_default} alt=${pokemon.name}>
                            <p> ${pokemon.name}</p>
                            <p> ${tipo[0].type.name}</p>
                        </figure>
                     `;}
                   } catch(err){
                        console.log(err);
                        let menssage= err.statusText || "Ocurrió un error";
                        $template+= `<figure class="tarjeta">
                            <figcaption > Error ${err.status}: ${menssage} </figcaption> 
                            </figure> `;
                   }
                }  //cierre del for 

                $main.innerHTML= $template;
                $prevLink=json.previous?`<a href="${json.previous}">⏮️</a>`:"";
                $nextLink=json.next ? `<a href="${json.next}">⏭</a>`:"";
                $links.innerHTML=$prevLink+" "+ $nextLink;
            }catch(err){
                console.log(err);
                let menssage= err.statusText || "Ocurrió un error";
                $main.innerHTML= `<p>Error :${err.status}`
            }
        }
        d.addEventListener("DOMContentLoaded",e=>loadPokemons(pokeAPI));

        d.addEventListener("click", e=>{
            if (e.target.matches(".links a")){
                e.preventDefault();
                //alert("funciona");
                loadPokemons(e.target.getAttribute("href"));
            }
        })