#  OpenAI Interface

![technology](https://github.com/Cryserrrrr/openAi-interface/assets/66973532/776cdaa0-e06a-459f-ac5e-0b1be5d70361)

 ## Table des matières
1. [Introduction](#introduction)
2. [Setup](#setup)
3. [Usage](#usage)
4. [Features](#features)
5. [Objective](#Objective)
6. [Contributing](#contributing)
7. [Issues and Feedback](#issues)

##  Introduction<a id="introduction"></a>

Welcome to the OpenAI Interface repository! This project provides a user-friendly interface to interact with various OpenAI models, including GPT-4, GPT-3, GPT-Vision, Text-to-Speech, Speech-to-Text, and DALL-E 3. You can seamlessly integrate these models into a conversation, making it easy to explore the capabilities of OpenAI's powerful technologies.

![gpt-interface](https://github.com/Cryserrrrr/openAi-interface/assets/66973532/e0f7aaad-9b16-4bee-bc2a-bbf495b0c598)

The application is built using Next.js for the frontend and Styled Components for styling. To get started, follow the setup instructions below.

##  Setup<a id="setup"></a>

1. Clone the repository to your local machine:

```bash

git clone https://github.com/your-username/openAi-interface.git

```

2. Navigate to the project directory:

```bash

cd openAi-interface

```

3. Create a `.env.local` file in the root of the project and add your OpenAI API key:

```env

NEXT_PUBLIC_OPENAI_API_KEY=your-api-key-here

```

Replace `your-api-key-here` with your actual OpenAI API key.

4. Install dependencies:

```bash

npm install

```

5. Start the development server:

```bash

npm run dev

```  

6. Open your browser and visit [http://localhost:3000](http://localhost:3000) to access the OpenAI Interface.

##  Usage<a id="usage"></a>

The OpenAI Interface allows you to create dynamic conversations using various OpenAI models. Explore the different functionalities and experiment with combining multiple models in a single conversation.

##  Features<a id="features"></a>

- **GPT-4, GPT-3, GPT-Vision**: Easily switch between different OpenAI models.

- **Text-to-Speech and Speech-to-Text**: Convert text to speech and vice versa. 🚧

- **DALL-E 3 Integration**: Generate creative and unique images with DALL-E 3. 🚧

- **Multi-Model Conversations**: Combine different models in the same conversation. 🚧 (only with gpt models)

## Objective<a id="objective"></a>

The primary goal of this repository is to establish a comprehensive environment integrating the OpenAI API, enabling seamless transitions between various models for versatile applications. Users will have the flexibility to leverage different models based on their specific needs. In the future, the project aims to expand its capabilities by incorporating functionalities such as video processing with GPT Vision, additional API call features, and other enhancements to further enhance the overall user experience.

##  Contributing<a id="contributing"></a>

If you would like to contribute to the project, please check the [contribution guidelines](CONTRIBUTING.md).

##  Issues and Feedback<a id="issues"></a>

If you encounter any issues or have feedback, please [open an issue](https://github.com/Cryserrrrr/openAi-interface/issues).
