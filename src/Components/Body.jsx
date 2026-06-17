import ProfileCard from "./ProfileCard";
import About from "./About";
import Skill from "./Skill";
import Stats from "./Stats";
import Services from "./Services";
import Projects from "./Projects";
/**
 * Body Component
 * 
 * The main container for the portfolio's core sections. It dictates the layout 
 * hierarchy and coordinates the distribution of shared animation and interaction hooks.
 * 
 * @param {Object} props
 * @param {string} props.typedText - The dynamic text for the hero typewriter effect.
 * @param {Function} props.scrollReveal - Hook function to trigger viewport-based scroll animations.
 * @param {Function} props.buttonAction - Shared handler for interactive button effects like ripples.
 */
function Body({ typedText, scrollReveal, buttonAction }) {
  return (
    <div className="body-3d-space">
      {/* Hero + introduction */}
      <ProfileCard
        typedText={typedText}
        scrollReveal={scrollReveal}
        buttonAction={buttonAction}
      />
      {/* Core portfolio sections */}
      <About scrollReveal={scrollReveal} buttonAction={buttonAction} />
      <Skill scrollReveal={scrollReveal} />
      <Stats scrollReveal={scrollReveal} />
      <Services scrollReveal={scrollReveal} />
      <Projects scrollReveal={scrollReveal} />
    </div>
  );
}

export default Body;
