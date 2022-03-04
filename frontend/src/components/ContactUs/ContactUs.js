import emailjs from "@emailjs/browser"
import './ContactUs.css'
import { height } from "@mui/system";

const ContactUs = () => {
    function sendEmail(e){
        e.preventDefault();

        emailjs.sendForm(
            "service_494w3ud",
            "template_qz3lsg6",
            e.target,
            "rDHVkNXTPgQdEfo57"
        ).then(res => {
            console.log(res);
        }).catch(err => console.log(err));
    }
    return (
        <div className="container border"
            style={{marginTop:"50px",
            marginBottom: "150px",
            width:'50%',
            backgroundImage: `url('https://www.solidbackgrounds.com/images/1920x1080/1920x1080-orange-red-solid-color-background.jpg')`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            height: "650px"
        }}
           >
            <h1 style={{marginTop: '25px'}}>Contact Form</h1>
            <form className="row" style={{margin: "25px 85px 75px 100px"}}
                onSubmit={sendEmail}>
                <label>Name</label>
                <input type="text" name="name" className="form-control"/>

                <label>Email</label>
                <input type="email" name="user_email" className="form-control"/>

                <label>Message</label>
                
                <textarea name='message' rows='4' className="form-control"/>
                <input type='submit'
                    value='Send'
                    className="form-control btn btn-primary"
                    style={{marginTop: '30px'}}/>
            </form>
        </div>

    );
};
 
 export default ContactUs