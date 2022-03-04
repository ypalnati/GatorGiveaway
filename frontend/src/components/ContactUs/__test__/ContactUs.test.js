import { render,screen } from '@testing-library/react'

import  ContactUs  from '../ContactUs'


test('Render AboutUs component', () => {
    render(<ContactUs />); 
    const linkElement = screen.getByText('Contact Form')
   expect(linkElement).toBeInTheDocument();
    
  });
  