
import { useEffect, useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from './components/ui/card';



type quotes = {
  "quote":string,
  "author":string,
  "category":string
}

function App() {
  const [quotes,setQuotes] = useState<quotes>({});
  const [change,setChange] = useState<string>("");
  const [category,setCategory] = useState("happiness");


  const loadQuotes = async() :Promise<void>=>{
    try{
      const res = await fetch("https://api.api-ninjas.com/v1/quotes?category="+category,{
        method:'GET',
        headers:{
          'X-Api-key':'ZVr41VI8uz8JVyhfBV2dww==muEvSi0dofLFLQaW'
        }
      });
  
      if(!res.ok){
        console.log("tsy ok le res");
      }
      
        const data:quotes = await res.json();        
        setQuotes(data[0]);
        
    }catch(err){
      console.log(err);
      
    }
  
    
  };
  useEffect(()=>{
    
    loadQuotes();
  },[category])

   const handle_change = (event:React.ChangeEvent<HTMLInputElement>)=>{
    setChange(event.target.value)
   }
   const handleClick = ()=>{
    setCategory(change);
   }

  return (
    <div className='flex-col items-center content dark  h-screen w-screen gap-x-5 bg-black'>
      <div className="text-white text-center text-3xl">
        Tomorow... 
        <span className="italic text-yellow-300"> is a Tomorow , </span> 
        Tomorow you wake up
        <span className='font-bold text-yellow-300'> , you motivate ..... </span>
        Tomorow  (yeah!)
        <br /><span className=' font-bold'>-Ray</span>
      </div>
      <Card>
        <CardHeader>
          <h1>{quotes.category}</h1>
        </CardHeader>
        <CardContent>
          <h1 className='font-bold'>{quotes.quote}</h1>
  
        </CardContent>
        <CardFooter>
          <h1> -{quotes.author}</h1>
        </CardFooter>
      </Card>
      <div className='w-80 h-auto flex-col gap-y-4 dark content-center items-center'>
        <Input type='text' value={change} onChange={handle_change} placeholder='Enter category' className='text-white !p-4'></Input>
        <Button onClick={handleClick} className='w-full !p-4'>select</Button>
      </div>
    </div>
  )
}

export default App
