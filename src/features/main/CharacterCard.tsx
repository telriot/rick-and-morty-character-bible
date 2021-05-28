//  ======================================== IMPORTS
import {Button, Card} from 'react-bootstrap'
import { CharacterData } from 'types'
//  ======================================== COMPONENT
interface CharacterCardProps {
    character: CharacterData
}
const CharacterCard = ({character}:CharacterCardProps) => {
    //  ======================================== HOOKS
    //  ======================================== STATE
    //  ======================================== HANDLERS
    const handleClick = () => (console.log(`go to /characters/${character.id}`))
    //  ======================================== EFFECTS
    //  ======================================== JSX
    return (
<Card className='h-100'>
  <Card.Img variant="top" style={{height: '12rem', objectFit:'cover'}}src={character.image} />
  <Card.Body className='d-flex flex-column justify-content-between'>
      <div className='mb-3'>
      <Card.Title>{character.name}</Card.Title>
    <Card.Text className='mb-1'>{character.species}</Card.Text>
    <Card.Text>{character.status}</Card.Text>
      </div>
    <Button variant="primary" onClick={handleClick}>Details</Button>
  </Card.Body>
</Card>
    )
}
 
//  ======================================== EXPORTS
export default CharacterCard
//  ========================================