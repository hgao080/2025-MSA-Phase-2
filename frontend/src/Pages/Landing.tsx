import Header from '../Components/Header';
import Hero from '../Components/Hero';
import Feature from '../Components/Feature'

export default function Landing() {
	return (
		<div>
			<div className='absolute inset-x-0 top-0 z-50'>
				<Header />
			</div>

			<div className=''>
				<Hero />
			</div>

      <div className="">
        <Feature />
      </div>
		</div>
	);
}
