1. Deployment Links
GitHub Repository: [https://github.com/Simcha19/CraftCart.git]

Live Application: [Paste your Vercel or Netlify live site link here]

2. AI Tool Disclosure
AI Tools Used: Gemini,Claude and VS agents

How I Used Them: I used AI to help me outline the form context logic,  doublecheck for errors and correct them, draft the layout with Tailwind CSS, and debug build errors when Vite wouldn't load my components properly.

3. Blockers & Solutions
The Problem: Whenever I moved between steps, the form cleared all the user's choices. I also hit a blank screen at one point because my main component wasn't being exported properly.

How I Fixed It: I moved the state up into a shared FormContext file instead of keeping it inside individual step components. I also used localStorage so the form saves automatically when you refresh the page, and fixed the export line in MultiStepWizard.jsx so React could load the page correctly.

4. Deployment Process
Created the project using Vite and set up Tailwind CSS for styling.