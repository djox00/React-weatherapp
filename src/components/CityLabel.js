
import styled, { StyledComponent } from 'styled-components'
const CityLabel = styled.label`
    display: inline;
    color: ${(props) => props.MouseHover ? ' #3399ff' : 'white'}; 
    transition: 0.3s;
    
    &:hover{ 
        cursor: pointer; 
    }


  
`;
export default CityLabel
