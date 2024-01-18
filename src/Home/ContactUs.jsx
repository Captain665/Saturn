import React from "react";

export default function Contact() {
    return (
        <div className="m-2 h-fit shadow indent-5 w-9/12 self-center px-32 py-3 bg-rose-100">
            <br />
            <header>
                <h1 className="text-4xl font-bold" >Contact Us</h1><hr /><br />
                <p>Welcome to [Your Website Name]! We're thrilled to hear from you.</p>
            </header><br />

            <section>
                <h2 className="text-2xl font-bold">How to Reach Us</h2>

                <div>
                    <h3 className="text-xl font-bold">Email</h3>
                    <p>For general inquiries, reach out to us via email at <a href="mailto:your@email.com">your@email.com</a>. We aim
                        to respond to emails within [X] business days.</p>
                </div><br />

                <div>
                    <h3 className="text-xl font-bold">Social Media</h3>
                    <p>Connect with us on social media for the latest updates, behind-the-scenes glimpses, and to be part of our
                        vibrant food community:</p>
                    <ul>
                        <li><a href="https://www.instagram.com/yourhandle" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                        <li><a href="https://www.facebook.com/yourpage" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                        <li><a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                    </ul>
                </div><br />

                <div>
                    <h3 className="text-xl font-bold">Mailing Address</h3>
                    <p>If you prefer traditional mail, you can send us letters or packages to our mailing address:</p>
                    <ul><br />
                        <li>[Your Company Name]</li>
                        <li>[Street Address]</li>
                        <li>[City, State, ZIP Code]</li>
                        <li>[Country]</li>
                    </ul>
                </div>

            </section ><br />

            <section>
                <h2 className="text-2xl font-bold">Support and Feedback</h2><hr />

                <div>
                    <h3 className="text-xl font-bold">Customer Support</h3>
                    <p>If you need assistance with an order, have a product-related question, or encounter any issues on our
                        website, our customer support team is here to help. Please email <a
                            href="mailto:support@email.com">support@email.com</a> for prompt assistance.</p>
                </div>

                <div>
                    <h3 className="text-xl font-bold">Feedback</h3>
                    <p>We value your feedback! Let us know what you love about [Your Website Name] or how we can enhance your
                        experience. Your insights help us continually improve. Send your feedback to <a
                            href="mailto:feedback@email.com">feedback@email.com</a>.</p>
                </div>

            </section><br />

            <section>
                <h2 className="text-2xl font-bold">Collaborations and Partnerships</h2>

                <p>We're open to collaborations and partnerships with fellow food enthusiasts, chefs, and brands. If you're
                    interested in working with us, please contact our partnerships team at <a
                        href="mailto:partnerships@email.com">partnerships@email.com</a>.</p>

            </section><br />

            <section>
                <h2 className="text-2xl font-bold">Stay Connected</h2>

                <p>Subscribe to our newsletter to receive the latest recipes, cooking tips, and exclusive offers directly to
                    your inbox. Join our growing community of food lovers and stay connected with [Your Website Name]. <br />
                    <br /><a href="[Subscribe Now Link]">Subscribe Now</a></p>

            </section><br />

            <footer><hr />
                <p>Thank you for being a part of our culinary journey. We look forward to hearing from you and sharing the joy
                    of food!</p><br />
                <p>Happy Cooking,</p>
                <p>The [Your Website Name] Team</p>
            </footer>
        </div >
    )
}