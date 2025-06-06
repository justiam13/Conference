const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Page = require('../models/Page');

dotenv.config();
const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/conference';

const aboutUsPageData = {
  title: 'About the Conference',
  slug: 'about-us',
  content: `
    <h2>Welcome to Our Conference</h2>
    <p>Join us for an exciting conference featuring the latest developments in technology and innovation. Our event brings together industry leaders, researchers, and enthusiasts to share knowledge and foster collaboration.</p>

    <h2>Our Mission</h2>
    <p>We aim to create a platform where professionals can share their expertise, learn from others, and build meaningful connections. Our conference is designed to inspire innovation and drive progress in the field.</p>

    <h2>What to Expect</h2>
    <ul>
      <li>Keynote speeches from industry leaders</li>
      <li>Technical workshops and hands-on sessions</li>
      <li>Networking opportunities with peers</li>
      <li>Latest research presentations</li>
      <li>Panel discussions on current trends</li>
    </ul>

    <h2>Why Attend?</h2>
    <p>Our conference offers unique opportunities to:</p>
    <ul>
      <li>Learn from experts in the field</li>
      <li>Network with industry professionals</li>
      <li>Discover new technologies and trends</li>
      <li>Share your research and ideas</li>
      <li>Build valuable connections</li>
    </ul>

    <h2>Join Us</h2>
    <p>Don't miss this opportunity to be part of an exciting event that brings together the best minds in the industry. Register now to secure your spot!</p>
  `,
  isPublished: true
};

async function addAboutUsPage() {
  try {
    await mongoose.connect(dbUri);
    console.log('MongoDB connected for script.');

    const existingPage = await Page.findOne({ slug: aboutUsPageData.slug });

    if (existingPage) {
      console.log(`Page with slug '${aboutUsPageData.slug}' already exists.`);
    } else {
      const newPage = new Page(aboutUsPageData);
      await newPage.save();
      console.log(`Page '${aboutUsPageData.title}' created successfully.`);
    }
  } catch (error) {
    console.error('Error adding About Us page:', error);
  } finally {
    mongoose.disconnect();
    console.log('MongoDB disconnected.');
  }
}

addAboutUsPage(); 