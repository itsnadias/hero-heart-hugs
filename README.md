# Hope Explorer

Build a playful, hopeful cancer education app for children

Create a child-friendly educational web/mobile app that helps children learn about different types of cancer in a safe, encouraging, age-appropriate way.

Core concept

The child enters or selects the type of cancer they want to learn about. The app's AI then gathers and presents accurate, medically reviewed information from trusted sources and turns that information into a short educational game.

The experience should feel like an adventure rather than a medical app. It should be playful, hopeful, colorful, encouraging, and never frightening.

Important medical safety requirements

Do not diagnose the child or tell them what treatment they personally need.

Clearly explain that the app is for education and support, not a replacement for doctors, nurses, parents, or caregivers.

Never promise that a food, activity, or behavior can cure cancer.

Health and nutrition information must be age-appropriate and carefully worded.

Encourage children to talk to their parent/guardian and healthcare team about personal medical questions.

AI-generated medical information should be grounded in reliable sources such as major children's hospitals, cancer organizations, government health agencies, and peer-reviewed medical information.

Display the sources used for each cancer topic.

Include a prominent “Ask a Grown-Up or Doctor” option throughout the experience.

Avoid scary images, graphic medical imagery, death-focused language, or unnecessarily frightening statistics.

Home screen

Create a welcoming homepage with:

Bright, inspiring colors.

Friendly animal characters.

Large, simple buttons.

Gentle animations.

Positive background music/sound effects that can be muted.

A welcoming message such as “Let’s learn, explore, and grow stronger together!”

A cancer-topic search/selection box.

A button to start the learning adventure.

A parent/caregiver information section.

The visual style should use inspiring blues, greens, yellows, oranges, purples, and pinks, while maintaining excellent readability and accessibility.

Cancer topic input

Allow the child to type or select a cancer type.

Examples:

Leukemia

Lymphoma

Brain tumors

Bone cancer

Neuroblastoma

Wilms tumor

And other childhood cancers

If the AI cannot confidently identify the requested cancer type, do not invent information. Instead, ask the user to clarify or explain that the topic is not currently supported.

After the child chooses a topic, create a personalized 5-level-or-fewer adventure.

Game structure

Each cancer topic should generate a game containing no more than 5 levels.

Every level has a different friendly animal character.

For example:

🦁 Leo the Lion — “Meet Your Body”

Introduces basic information about the cancer.

Explains where it can occur in the body using simple, non-scary language.

Uses a colorful interactive body illustration.

🐼 Pia the Panda — “Understanding Your Cancer”

Explains important facts about the specific cancer.

Uses simple quizzes, matching games, and interactive cards.

🐬 Daisy the Dolphin — “Taking Care of Yourself”

Teaches healthy habits that may support general wellbeing during treatment.

Include age-appropriate information about food, hydration, rest, movement when appropriate, hygiene, and emotional wellbeing.

Never present food or lifestyle choices as a cure.

Clearly explain that the child's healthcare team may give them special instructions.

🦊 Finn the Fox — “Your Healthcare Team”

Introduces doctors, nurses, caregivers, pharmacists, psychologists, dietitians, and other members of a healthcare team.

Teaches children that asking questions is okay.

Include examples of questions they can ask their healthcare team.

🐢 Toby the Turtle — “You’re a Super Learner!”

A fun final challenge reviewing what the child learned.

Give encouraging feedback.

Celebrate progress rather than medical outcomes.

If fewer levels are appropriate for a particular topic, generate fewer levels.

Gameplay

Make every level interactive rather than simply showing paragraphs of text.

Use activities such as:

Multiple-choice questions

Drag-and-drop activities

Matching games

Memory cards

“Choose the healthy habit” activities

True/false questions

Interactive illustrations

Simple puzzles

Short animations

Character conversations

Award points whenever the child answers correctly.

Use encouraging feedback such as:

“Amazing!”

“Great thinking!”

“You got it!”

“Super learner!”

“Let’s try that one again!”

If the child gets an answer wrong, never shame them. Give a gentle explanation and allow them to try again.

Points and rewards

Create a simple points system.

For example:

Correct answer: +10 points

Completing an activity: +20 points

Completing a level: +50 points

Completing the entire adventure: bonus points

Show a colorful progress bar and a friendly animal character celebrating the child's progress.

Do not make the game competitive or compare children with other users.

Final reward

After completing the adventure, unlock a Fun Gift.

The gift could be a digital collectible such as:

A virtual animal friend

A colorful badge

A superhero cape for their character

A downloadable coloring page

A virtual sticker collection

A certificate saying “Cancer Learning Adventure Complete!”

A customizable digital room item

Make the reward feel exciting and celebratory without suggesting that completing the game means the child's cancer is cured or that they have achieved a medical outcome.

AI content system

Build the app so that the AI creates the educational content dynamically based on the cancer topic selected.

The AI should:

Identify the cancer type.

Retrieve information from approved, trustworthy medical sources.

Cross-check important medical facts.

Convert the information into age-appropriate language.

Create a game of 5 levels or fewer.

Generate questions and activities based on the information.

Provide citations/sources.

Avoid unsupported medical claims.

Flag information that requires discussion with a healthcare professional.

Create a backend/content architecture that makes it easy to update trusted sources and review generated content.

Parent/caregiver mode

Include a separate parent/caregiver area.

It should provide:

More detailed explanations.

Sources and references.

Information about how the educational game works.

Safety/disclaimer information.

Suggested conversation starters for talking with children.

A way to review what topics the child learned about.

Do not expose unnecessary personal health information.

Accessibility

Design the entire app for children with different abilities.

Include:

Large readable text.

High color contrast.

Simple navigation.

Voice/audio support where possible.

Captions for spoken content.

Reduced-motion setting.

Mute controls.

Keyboard accessibility.

Screen-reader-friendly labels.

Avoid relying on color alone to communicate information.

Visual design

The overall feeling should be:

Playful + Hopeful + Safe + Energetic + Caring + Educational

Use rounded cards, colorful illustrations, soft shadows, friendly animations, stars, clouds, plants, rainbows, and cheerful animal characters.

Avoid making the interface look like a hospital or clinical dashboard.

The animal characters should have distinct personalities and appearances, and each cancer topic can optionally have its own themed world.

Technical requirements

Build a polished, responsive application with:

A modern, child-friendly frontend.

Secure backend/API architecture.

AI-powered cancer-topic content generation.

Reliable medical-source retrieval.

Structured game-generation logic.

User progress tracking.

Points and rewards.

Level completion tracking.

Parent/caregiver mode.

Content safety checks.

Error handling when the AI cannot verify information.

Loading states while information is being gathered.

Mobile, tablet, and desktop responsiveness.

Create reusable components for:

Animal characters

Levels

Questions

Mini-games

Progress bars

Points

Rewards

Educational information cards

Source/citation panels

Parent mode

Safety notices

Important UX principle

The child should always feel:

“I can learn about my body, ask questions, take care of myself, and talk to the grown-ups and healthcare team who help me.”

The app should provide hope and empowerment without giving false hope or medical promises.

Build the first version with a polished sample cancer topic so the complete experience can be demonstrated from topic selection → AI information → 5-level game → points → final challenge → fun gift.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f67a64fe-2904-4718-a453-4a69e673c948).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
