import { Memory } from '@material-ui/icons';
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';


import  Header  from '../../Header/Header'


test('1Header component render test', () => {
    render(
    <MemoryRouter>
        <Header />
    </MemoryRouter>
   
    ); 
    const linkElement = screen.getByRole("button")
    expect(linkElement).toBeInTheDocument();
   
    
  });

  test('Image present in component', () => {
    render(
    <MemoryRouter>
        <Header />
    </MemoryRouter>
   
    ); 
    screen.getB
    const linkElement = screen.getByRole("img")
    expect(linkElement).toBeInTheDocument();
   
    
  });

  test('Test mui class present in tab', () => {
    const {container} = render(
    <MemoryRouter>
        <Header />
    </MemoryRouter>
   
    ); 
    expect(container.firstChild).toHaveClass('header')
   
    
  });

  test('About present in component', () => {
    render(
    <MemoryRouter>
        <Header />
    </MemoryRouter>
   
    ); 
    
 
    const linkElement = screen.getByText("About")
    expect(linkElement).toBeInTheDocument();
   
    
  });
  
  test('Gator give away present in component', () => {
    render(
    <MemoryRouter>
        <Header />
    </MemoryRouter>
   
    ); 
    
 
    const linkElement = screen.getByText("GatorGiveAway")
    expect(linkElement).toBeInTheDocument();
   
    
  });

    
  test('Favorites present in component', () => {
    render(
    <MemoryRouter>
        <Header />
    </MemoryRouter>
   
    ); 
    
 
    const linkElement = screen.getByText("Favorites")
    expect(linkElement).toBeInTheDocument();
   
    
  });

      
  test('Logout present in component', () => {
    render(
    <MemoryRouter>
        <Header />
    </MemoryRouter>
   
    ); 
    
 
    const linkElement = screen.getByText("LogOut")
    expect(linkElement).toBeInTheDocument();
   
    
  });
  