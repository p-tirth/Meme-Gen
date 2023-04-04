import React  from 'react'

export default function Content() {

  const [meme ,setMeme] = React.useState({
    topText:"",
    bottomText:"",
    randomImage:""
  })

  const [allMemeImage, setAllMeme] = React.useState([])

  function handelChange(event){
    const {name,value,type} = event.target

    setMeme(prevMeme => ({
      ...prevMeme,
      [name]:value
    }))
  }

  function getMemeImage() {
    // const allMemeImage = allMemeImage
    const randomNumber =  Math.floor(Math.random()*allMemeImage.length)

    let url = allMemeImage[randomNumber].url 
    const top = document.querySelector(".top-text").value
    const bottom = document.querySelector(".bottom-text").value
    setMeme(prevMeme => ({
      topText:top,
      bottomText:bottom,
      randomImage : url
    }))
  }
  function getImgSize(){
    let img = document.getElementById("meme");
    console.log(img.naturalHeight)
  }

  React.useEffect(()=>{
    fetch("https://api.imgflip.com/get_memes")
    .then(res =>res.json())
    .then(Data=>setAllMeme(Data.data.memes))
  },[])


  return (
    <div>
      <div className="grid-container">
          <input className='top-text' type="text" name="topText" value={meme.topText} onChange={handelChange}/>
          <input className='bottom-text' type="text" name="bottomText" value={meme.bottomText} onChange={handelChange}/>
          <button onClick={getMemeImage} className='grid-button'>Get a new meme image</button>
      </div>
      <div className='img-container'>
        <div className="img-view">
          <img id="meme" src={meme.randomImage} alt="bruh" className="meme-img" />
          <h2 className="meme--text top">{meme.topText}</h2>
          <h2 className="meme--text bottom">{meme.bottomText}</h2>
        </div>
      </div>
    </div>
  )
}