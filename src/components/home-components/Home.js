import Team from "./Team";
import Announcement from "./Announcement";
import Media from "./Media";
import Roadmap from "./Roadmap";
import About from "./About";
import HomeBanner from "./Banner";

import { motion } from "framer-motion";

const Home = () => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div>
                <HomeBanner />
                <About />
                <Team />
                <Announcement />
                <Roadmap />
                <Media />
            </div>
        </motion.div>
    );
}

export default Home