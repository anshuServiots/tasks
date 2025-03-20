export async function getData(currentPage : string ,  take : number , orderBy : string , sortIn : string , first_name : string){

    fetch(`http://localhost:3000/getData?currentPage=${currentPage}&orderBy=${orderBy}&sortIn=${sortIn}&first_name=${first_name}&take=${take}`)
      .then(data => data.json())
      .then((data)=>{
      console.log(data)

    })
}
