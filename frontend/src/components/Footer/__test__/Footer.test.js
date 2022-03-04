import { Memory } from '@material-ui/icons';
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';


import  Footer  from '../Footer'


test('Render AboutUs component', () => {
   const {container} = render(
    <MemoryRouter>
    <Footer />
    </MemoryRouter>
    ); 
    expect(container.firstChild).toHaveClass('footer');
    
  });
  