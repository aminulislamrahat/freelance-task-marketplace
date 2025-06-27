import Hero from '../components/hero/Hero'
import HowItWorks from '../components/homePageComponents/HowItWorks';
import RecentTasksSection from '../components/homePageComponents/RecentTasksSection';
import HeroOverlayCards from '../components/homePageComponents/HeroOverlayCards';
import AboutUsSection from '../components/homePageComponents/AboutUsSection';
import NewsletterSection from '../components/homePageComponents/NewsletterSection';

export const Home = () => {

    return (
        <>
            <div className="relative mb-20">
                <Hero />
                <HeroOverlayCards />
            </div>
            <AboutUsSection />
            <RecentTasksSection />
            <HowItWorks />
            <NewsletterSection />

        </>
    )


}
