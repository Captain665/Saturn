import React from "react";

export default function About() {
    return (
        <div className="m-2 h-fit shadow md:indent-5 indent-2 md:w-9/12 self-center px-1 md:px-32 md:py-3 bg-rose-100 text-pretty">
            <br />
            <header>
                <h1 className="md:text-4xl text-2xl font-bold">About Us</h1><hr /><br />
                <p className="text-sm md:text-base">Welcome to [Your Website Name], where passion for food meets culinary excellence! We are a team of dedicated
                    food enthusiasts committed to bringing you a delightful culinary experience.</p>
            </header><br /> 

            <section>
                <h2 className="md:text-xl font-bold text-lg">Our Mission</h2>
                <p className="text-sm md:text-base">At [Your Website Name], our mission is simple yet profound — to create a space where food becomes an adventure.
                    We believe in the power of exceptional ingredients, innovative recipes, and the joy of sharing delicious
                    meals with loved ones. Our goal is to inspire and elevate your culinary journey.</p><br />
            </section>

            <section>
                <h2 className="font-bold md:text-xl text-lg">Our Story</h2>
                <p className="text-sm md:text-base">[Your Website Name] began as a shared dream among friends who bonded over a love for flavors and the magic
                    that happens in the kitchen. Our journey started in [Year], and since then, we've embarked on a quest to
                    explore the world of gastronomy, bringing you a curated selection of recipes, cooking tips, and food
                    stories.</p><br />
            </section>

            <section>
                <h2 className="md:text-2xl text-xl font-bold">What Sets Us Apart</h2><hr /><br />

                <div>
                    <h3 className="font-bold md:text-xl text-lg">Quality Ingredients</h3>
                    <p className="text-sm md:text-base">We believe that the foundation of every great dish lies in the quality of its ingredients. That's why we
                        source only the finest, freshest produce, spices, and other culinary treasures to ensure that each recipe
                        on [Your Website Name] meets the highest standards of taste and nutrition.</p><br />
                </div>

                <div>
                    <h3 className="font-bold md:text-xl text-lg">Culinary Expertise</h3>
                    <p className="text-sm md:text-base">Our team is comprised of seasoned chefs, home cooks, and food enthusiasts who are passionate about sharing
                        their knowledge and expertise. Whether you're a beginner looking to master the basics or an experienced
                        chef seeking new inspiration, we have something for everyone.</p><br />
                </div>

                <div>
                    <h3 className="font-bold md:text-xl text-lg">Community and Connection</h3>
                    <p className="text-sm md:text-base">Food has the incredible power to bring people together. We invite you to be part of our community, where
                        you can share your culinary adventures, swap recipes, and connect with fellow food lovers. Follow us on
                        social media, join our cooking challenges, and let's create a vibrant and supportive food community.</p><br />
                </div>

            </section>

            <section>
                <h2 className="font-bold text-xl md:text-2xl">Meet the Team</h2><hr /><br />

                <div>
                    <h3 className="font-bold">[Founder/Name]</h3>
                    <p className="text-sm md:text-base">*Title and Brief Bio*</p>
                </div>

                <div>
                    <h3 className="font-bold">[Chef/Name]</h3>
                    <p className="text-sm md:text-base">*Title and Brief Bio*</p>
                </div>

                <div>
                    <h3 className="font-bold">[Food Enthusiast/Name]</h3>
                    <p className="text-sm md:text-base">*Title and Brief Bio*</p>
                </div>

            </section><br />

            <footer><hr />
                <p className="text-sm md:text-base">Thank you for being part of the [Your Website Name] family. Get ready to embark on a culinary journey filled
                    with flavor, creativity, and a whole lot of deliciousness!</p><br />
                <p>Happy Cooking,</p>
                <p>The [Your Website Name] Team</p>
            </footer>
        </div>
    )
}