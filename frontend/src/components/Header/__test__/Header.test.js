import { Memory } from '@material-ui/icons';
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';


import  Header  from '../Header'


test('Header component render test', () => {
    render(
    <MemoryRouter>
        <Header />
    </MemoryRouter>
   
    ); 
    screen.getB
    const linkElement = screen.getByText('Gator Giveaway')
    expect(linkElement).toBeInTheDocument();
   
    
  });
  