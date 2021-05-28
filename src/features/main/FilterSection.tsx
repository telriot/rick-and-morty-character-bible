//  ======================================== IMPORTS
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	genderFilterSet,
    nameFilterSet,
	selectFilters,
	statusFilterSet
} from 'features/main/mainSlice';
import { Dropdown, FormControl } from 'react-bootstrap';
import { CharacterGender, CharacterStatus } from 'types';

const GENDERS: CharacterGender[] = ['Female', 'Male', 'Genderless', 'unknown'];
const STATUSES: CharacterStatus[] = ['Alive', 'Dead', 'unknown'];

//  ======================================== COMPONENT
const FilterSection = () => {
	//  ======================================== HOOKS
	const dispatch = useDispatch();
	//  ======================================== STATE
	const filters = useSelector(selectFilters);
	//  ======================================== HANDLERS
	const handleGenderClick = (gender: CharacterGender) =>
		dispatch(genderFilterSet(gender));
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => dispatch(nameFilterSet(event.target.value))
	const handleStatusClick = (status: CharacterStatus) =>
		dispatch(statusFilterSet(status));

	//  ======================================== EFFECTS
	//  ======================================== JSX
	return (
		<div className='d-flex flex-column'>
			<FormControl value={filters.name} onChange={handleNameChange}placeholder='Filter by name' />
			<Dropdown>
				<Dropdown.Toggle variant='light' id='status-filter'>
					Status
				</Dropdown.Toggle>

				<Dropdown.Menu>
					{STATUSES.map((status) => (
						<Dropdown.Item
                        key={`status-${status}`}
							as='button'
							onClick={() => handleStatusClick(status)}>
							{status}
						</Dropdown.Item>
					))}
				</Dropdown.Menu>
			</Dropdown>
			<Dropdown>
				<Dropdown.Toggle variant='light' id='gender-filter'>
					Gender Filter
				</Dropdown.Toggle>

				<Dropdown.Menu>
					{GENDERS.map((gender) => (
						<Dropdown.Item
                        key={`gender-${gender}`}

							as='button'
							onClick={() => handleGenderClick(gender)}>
							{gender}
						</Dropdown.Item>
					))}
				</Dropdown.Menu>
			</Dropdown>
		</div>
	);
};

//  ======================================== EXPORTS
export default FilterSection;
//  ========================================
