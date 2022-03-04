import './AboutUs.css'

function AboutUs() {
    return (<>
        <div className="about-section">
   <h1>About Us Page</h1>
   <p>Some text about who we are and what we do.</p>
   <p>Resize the browser window to see that this page is responsive by the way.</p>
 </div>
 
 <h2 style={{textAlign:'center'}}>Our Team</h2>
 <div className="row">
   <div className="column">
     <div className="card">
       <img src="https://avatars.githubusercontent.com/u/22216660?v=4" alt="Raghu" />
       <div className="container">
         <h2>Raghu Saripalli</h2>
         <p className="title">Go lang developer</p>
         <p>rsaripally@ufl.edu</p>
         <p><button className="button">Contact</button></p>
       </div>
     </div>
   </div>
 
   <div className="column">
     <div className="card">
       <img src="https://avatars.githubusercontent.com/u/87737522?v=4" alt="Yamini" />
       <div className="container">
         <h2>Yamini Palnati</h2>
         <p className="title">React developer</p>
         <p>ypalnati@ufl.edu</p>
         <p><button className="button">Contact</button></p>
       </div>
     </div>
   </div>
 
   <div className="column">
     <div className="card">
       <img src="https://avatars.githubusercontent.com/u/28947831?v=4" alt="Teja" />
       <div className="container">
         <h2>Tejasri Dontham</h2>
         <p className="title">Go lang developer</p>
         <p>tejasridontham@ufl.edu</p>
         <p><button className="button">Contact</button></p>
       </div>
     </div>
   </div>
   <div className="column">
     <div className="card">
       <img src="https://avatars.githubusercontent.com/u/91032296?v=4" alt="Sujay" />
       <div className="container">
         <h2>Sai Mohan Sujay</h2>
         <p className="title">React developer</p>
         <p>skanchumarthi@ufl.edu</p>
         <p><button className="button">Contact</button></p>
       </div>
     </div>
   </div>
 
   
   
 </div>
 
  
    </>)
 }
 
 export default AboutUs