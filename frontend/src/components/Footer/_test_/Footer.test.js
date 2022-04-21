import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import Footer from '../Footer';


  test('About Us present in component', () => {
    render(
    <MemoryRouter>
        <Footer />
    </MemoryRouter>
   
    ); 
    
 
    const linkElement = screen.getByText("About Us")
    expect(linkElement).toBeInTheDocument();
   
    
  });
  test('Contact Us present in component', () => {
    render(
    <MemoryRouter>
        <Footer />
    </MemoryRouter>
   
    ); 
    
 
    const linkElement = screen.getByText("Contact Us")
    expect(linkElement).toBeInTheDocument();
   
    
  });
  test('Gator Giveaway Git present in component', () => {
    render(
    <MemoryRouter>
        <Footer />
    </MemoryRouter>
   
    ); 
    
 
    const linkElement = screen.getByText("Gator GiveAway Git")
    expect(linkElement).toBeInTheDocument();
   
    
  });
