import { Fade } from "react-awesome-reveal";

export default function AboutUsSection() {
    return (
        <section className="bg-base-100 py-16 px-4 lg:px-24 my-20">
            <div className="max-w-5xl mx-auto text-center">
                <Fade direction="up">
                    <h2 className="text-5xl font-bold text-primary mb-6">About Us</h2>
                    <p className="text-2xl leading-relaxed">
                        Welcome to <span className="text-primary font-semibold">DoTask</span> — a modern freelance task marketplace that bridges the gap between people who need help and those looking to offer their skills. Whether you're a business owner with a tight deadline or a student seeking quick gigs, our platform empowers users to post tasks, bid on projects, and collaborate seamlessly.
                    </p>
                </Fade>

                <Fade direction="up" delay={300}>
                    <p className="mt-6 text-2xl">
                        Our mission is to simplify short-term collaboration by allowing users to match based on <strong>skills</strong>, <strong>budget</strong>, and <strong>deadlines</strong>. We believe in creating a flexible, fair, and fast-paced work environment where both task providers and freelancers can thrive.
                    </p>
                </Fade>
            </div>
        </section>
    );
}
