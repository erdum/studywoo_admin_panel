import { HamburgerIcon } from '@chakra-ui/icons';

const Header = ({ brandName }) => {
	return (
		<header className={'w-full h-16 bg-white text-primary shadow-md flex items-center justify-between px-4'}>
			<h1 className={'font-bold text-2xl'}>{brandName}</h1>
			<HamburgerIcon className={'text-2xl'}/>
		</header>
	);
};

export default Header;
