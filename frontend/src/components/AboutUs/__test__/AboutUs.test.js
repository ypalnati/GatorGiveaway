import { render,screen } from '@testing-library/react'

import  AboutUs  from '../AboutUs'


test('Render AboutUs component', () => {
    render(<AboutUs />); 
    const linkElement = screen.getByText('Raghu Saripalli')
   expect(linkElement).toBeInTheDocument();
    
  });
  