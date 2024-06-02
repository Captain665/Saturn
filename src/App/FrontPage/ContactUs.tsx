import React, { useEffect } from "react";
import UseAnalyticsEventTracker from "../Components/useAnalyticsEventTracker";

export default function Contact() {
    const gaEventTracker = UseAnalyticsEventTracker("Contect Us")   

    useEffect(() => {
        gaEventTracker("Contect Us");
    },[gaEventTracker])

    return (
        <div className="flex flex-col">
            <div className="m-2 h-fit shadow md:indent-5 indent-2 px-1 md:w-9/12 self-center md:px-32 md:py-3 text-pretty">
                <br />
                <header>
                    <h1 className="md:text-4xl text-2xl font-bold" >Contact Us</h1><hr /><br />
                    <p className="text-sm md:text-base">Welcome to Meal Monkey! We're thrilled to hear from you.</p>
                </header><br />

                <section>
                    <h2 className="md:text-2xl text-xl font-bold">How to Reach Us</h2>

                    <div>
                        <h3 className="font-bold md:text-xl text-lg">Email</h3>
                        <p className="text-sm md:text-base">For general inquiries, reach out to us via email at <a href="mailto:your@email.com">your@email.com</a>. We aim
                            to respond to emails within 1 business days.</p>
                    </div><br />

                    <div>
                        <h3 className="font-bold md:text-xl text-lg">Social Media</h3>
                        <p className="text-sm md:text-base">Connect with us on social media for the latest updates, behind-the-scenes glimpses, and to be part of our
                            vibrant food community:</p>
                        <ul>
                            <li><a href="https://www.instagram.com/yourhandle" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                            <li><a href="https://www.facebook.com/yourpage" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                            <li><a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                        </ul>
                    </div><br />

                    <div>
                        <h3 className="font-bold md:text-xl text-lg">Mailing Address</h3>
                        <p className="text-sm md:text-base">If you prefer traditional mail, you can send us letters or packages to our mailing address:</p>
                        <ul><br />
                            <li>Lohar&Sons PVT. LTD.</li>
                            <li>91 SpringBoard, C2</li>
                            <li>Noida Sector 1</li>
                            <li>India</li>
                        </ul>
                    </div>

                </section ><br />

                <section>
                    <h2 className="md:text-2xl text-xl font-bold">Support and Feedback</h2><hr />

                    <div>
                        <h3 className="font-bold md:text-xl text-lg">Customer Support</h3>
                        <p className="text-sm md:text-base">If you need assistance with an order, have a product-related question, or encounter any issues on our
                            website, our customer support team is here to help. Please email <a
                                href="mailto:support@email.com">support@mealMonkey.com</a> for prompt assistance.</p>
                    </div>

                    <div>
                        <h3 className="font-bold md:text-xl text-lg">Feedback</h3>
                        <p className="text-sm md:text-base">We value your feedback! Let us know what you love about Meal Monkey or how we can enhance your
                            experience. Your insights help us continually improve. Send your feedback to <a
                                href="mailto:feedback@email.com">feedback@mealMonkey.com</a>.</p>
                    </div>

                </section><br />

                <section>
                    <h2 className="md:text-2xl text-xl font-bold">Collaborations and Partnerships</h2>

                    <p className="text-sm md:text-base">We're open to collaborations and partnerships with fellow food enthusiasts, chefs, and brands. If you're
                        interested in working with us, please contact our partnerships team at <a
                            href="mailto:partnerships@email.com">partnerships@mealMonkey.com</a>.</p>

                </section><br />

                <section>
                    <h2 className="md:text-2xl text-xl font-bold">Stay Connected</h2>

                    <p className="text-sm md:text-base">Subscribe to our newsletter to receive the latest recipes, cooking tips, and exclusive offers directly to
                        your inbox. Join our growing community of food lovers and stay connected with Meal Monkey. <br />
                        <br /><a href="[Subscribe Now Link]">Subscribe Now</a></p>

                </section><br />

                <footer><hr />
                    <p className="text-sm md:text-base">Thank you for being a part of our culinary journey. We look forward to hearing from you and sharing the joy
                        of food!</p><br />
                    <p>Happy Cooking,</p>
                    <p>The Meal Monkey Team</p>
                </footer>
            </div >
        </div>
    )
}