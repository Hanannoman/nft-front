import './Home.css';
import Hero from '../../components/Hero/Hero';
import HowItWorks from '../../Components/HowItWorks/HowItWorks';
import DiscoverNft from '../../Components/DiscoverNft/DiscoverNft';
/*import MagicMashroom from '../../components/MagicMashroom/MagicMashroom';
import EmailSection from '../../components/EmailSection/EmailSection';
import TopCreators from '../../components/TopCreators/TopCreators';
import BrowseCategories from '../../components/BrowseCategories/BrowseCategories';
import DiscoverNft from '../../components/DiscoverNft/DiscoverNft';
import HowItWorks from '../../components/HowItWorks/HowItWorks';
import TrendingCollection from '../../components/TrendingCollection/TrendingCollection';
*/



export default function Home() {
  return(
    <>
      <Hero />
      <DiscoverNft />
      <HowItWorks />
    </>
  );
}