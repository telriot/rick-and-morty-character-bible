//  ======================================== IMPORTS
import { Button, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { CharacterData } from 'types';

//  ======================================== COMPONENT
interface CharacterCardProps {
	character: CharacterData;
}

const CharacterCard = ({ character }: CharacterCardProps) => {
	//  ======================================== HOOKS
	const router = useHistory()
	//  ======================================== STATE
	//  ======================================== HANDLERS
	const handleClick = () => router.push(`/characters/${character.id}`)
	//  ======================================== EFFECTS
	//  ======================================== JSX
	return (
		<Card className='h-100'>
			<Card.Img
				variant='top'
				style={{ height: '12rem', objectFit: 'cover' }}
				src={character.image}
			/>
			<Card.Body className='d-flex flex-column justify-content-between'>
				<div className='mb-3'>
					<Card.Title>{character.name}</Card.Title>
					<Card.Text className='mb-1'>
						Specie: {character.species.toLocaleLowerCase()}
					</Card.Text>
					<Card.Text>
						Status: {character.status.toLocaleLowerCase()}
					</Card.Text>
				</div>
					<Button variant='primary' block onClick={handleClick}>
						Details
					</Button>
			</Card.Body>
		</Card>
	);
};

//  ======================================== EXPORTS
export default CharacterCard;
//  ========================================
