//  ======================================== IMPORTS
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	genderFilterSet,
	nameFilterSet,
	selectAsyncStatus,
	selectFilters,
	statusFilterSet
} from 'features/main/mainSlice';
import { Dropdown, FormControl, Spinner } from 'react-bootstrap';
import StyledDropdown from 'common/components/StyledDropdown'
import capitalize from 'common/utils/capitalize'
import { CharacterGender, CharacterStatus, FilterOptions } from 'types';

const GENDERS: FilterOptions<CharacterGender> = [
	'Female',
	'Male',
	'Genderless',
	'unknown',
	null
];
const STATUSES: FilterOptions<CharacterStatus> = [
	'Alive',
	'Dead',
	'unknown',
	null
];

//  ======================================== COMPONENT
const Filters = () => {
	//  ======================================== HOOKS
	const dispatch = useDispatch();
	//  ======================================== STATE
	const asyncStatus = useSelector(selectAsyncStatus);
	const filters = useSelector(selectFilters);
	const isLoading = asyncStatus === 'pending';
	//  ======================================== HANDLERS
	const handleGenderClick = (gender: CharacterGender | null) =>
		dispatch(genderFilterSet(gender));
	const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
		dispatch(nameFilterSet(event.target.value));
	const handleStatusClick = (status: CharacterStatus | null) =>
		dispatch(statusFilterSet(status));

	//  ======================================== EFFECTS
	//  ======================================== JSX
	return (
		<div className='d-flex flex-column w-100'>
			<div className='position-relative'>
				<FormControl
					className='mb-3'
					id='name-filter'
					value={filters.name}
					onChange={handleNameChange}
					placeholder='Filter by name'
				/>
				{isLoading && (
					<Spinner
						className='position-absolute'
						animation='border'
						variant='primary'
						style={{
							top: '.675em',
							right: '.75rem',
							height: '1rem',
							width: '1rem'
						}}
					/>
				)}
			</div>

			<StyledDropdown
				title={filters.status ?? 'Status Filter'}
				id='status-dropdown'>
				{STATUSES.map((status) => (
					<Dropdown.Item
						key={`status-${status}`}
						as='button'
						onClick={() => handleStatusClick(status)}>
						{capitalize(status ?? 'any')}
					</Dropdown.Item>
				))}
			</StyledDropdown>
			<StyledDropdown
				title={filters.gender ?? 'Gender Filter'}
				id='gender-dropdown'>
				{GENDERS.map((gender) => (
					<Dropdown.Item
						key={`gender-${gender}`}
						as='button'
						onClick={() => handleGenderClick(gender)}>
						{capitalize(gender ?? 'any')}
					</Dropdown.Item>
				))}
			</StyledDropdown>
		</div>
	);
};

//  ======================================== EXPORTS
export default Filters;
//  ========================================
