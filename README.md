# Community Platform Plus - Frontend# Community Platform Plus - Frontend



A modern React-based frontend application for the Community Platform Plus system, providing an intuitive user interface for community interaction and management.A modern React-based frontend application for the Community Platform Plus project.



## 🌟 Features## Project Overview



- **Modern React Architecture**: Built with Create React App for optimal performanceThis project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and serves as the user interface for the Community Platform Plus system.

- **Responsive Design**: Mobile-first approach with Material-UI components

- **Real-time Communication**: Chat and messaging functionality## Available Scripts

- **User Management**: Profile management and authentication

- **Community Features**: Post creation, community browsing, and interactionIn the project directory, you can run:

- **Security Integration**: Built-in security scanning and vulnerability assessment

### `npm start`

## 🚀 Quick Start

Runs the app in the development mode.\

### PrerequisitesOpen [http://localhost:3000](http://localhost:3000) to view it in your browser.

- Node.js (v14 or higher)

- npm or yarnThe page will reload when you make changes.\

- Docker (for containerization)You may also see any lint errors in the console.



### Installation### `npm test`



1. **Clone the repository**Launches the test runner in the interactive watch mode.\

   ```bashSee the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

   git clone https://github.com/SanctuaryV/community-platform-plus-frontend.git

   cd community-platform-plus-frontend### `npm run build`

   ```

Builds the app for production to the `build` folder.\

2. **Install dependencies**It correctly bundles React in production mode and optimizes the build for the best performance.

   ```bash

   npm installThe build is minified and the filenames include the hashes.\

   ```Your app is ready to be deployed!



3. **Start development server**See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

   ```bash

   npm start### `npm run eject`

   ```

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

4. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.



## 📜 Available ScriptsInstead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.



### DevelopmentYou don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

- `npm start` - Runs the app in development mode

- `npm test` - Launches the test runner## Learn More

- `npm run build` - Builds the app for production

- `npm run eject` - Ejects from Create React App (⚠️ irreversible)You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).



### ProductionTo learn React, check out the [React documentation](https://reactjs.org/).

- `npm run build` - Creates optimized production build

- `docker build -t frontend .` - Build Docker image### Code Splitting

- `docker run -p 3000:3000 frontend` - Run containerized app

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

## 🏗️ Project Structure

### Analyzing the Bundle Size

```

src/This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

├── components/          # Reusable UI components

│   ├── AppAppBar.js    # Navigation bar### Making a Progressive Web App

│   ├── Chat.js         # Chat functionality

│   ├── Footer.js       # Footer componentThis section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

│   └── ...

├── shared-theme/       # Theme configuration### Advanced Configuration

│   ├── AppTheme.js     # Main theme setup

│   └── customizations/ # UI customizationsThis section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

├── img/                # Image assets

├── api.js              # API integration### Deployment

└── [Pages].js          # Main page components

```This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)



## 🔧 CI/CD Pipeline### `npm run build` fails to minify



### Jenkins IntegrationThis section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

The project uses Jenkins for automated build and deployment:

## CI/CD Pipeline

**Pipeline Stages:**

1. **Clone Repository** - Fetch latest codeThis project uses Jenkins for continuous integration and deployment with the following features:

2. **Install Dependencies** - npm install

3. **Security Scan** - Checkmarx SAST (optional)### Pipeline Stages

4. **Build Docker Image** - Container creation- **Clone Repository**: Fetches the latest code from GitHub

5. **Push to Registry** - Google Artifact Registry (optional)- **Install Dependencies**: Runs `npm install` to install project dependencies

- **SAST - Checkmarx**: Optional security scanning (when enabled)

### Webhook Notifications- **Build Docker Image**: Creates a Docker container for the application

Automated notifications sent to n8n for build status:- **Push to GAR**: Optional push to Google Artifact Registry



```json### Webhook Notifications

{The Jenkins pipeline automatically sends detailed build notifications to n8n via webhook:

  "jobName": "frontend-build",

  "buildNumber": "45",- **Build Status**: Success/Failure notifications

  "jobResult": "SUCCESS",- **Timing**: Build start/end times in Bangkok timezone (Asia/Bangkok)

  "isSuccess": true,- **User Info**: Who triggered the build

  "triggeredBy": "developer-name",- **Stage Info**: Which stage failed (if applicable)

  "startTime": "2025-10-02 15:30:00",- **Repository Info**: Branch and commit details

  "endTime": "2025-10-02 15:33:00",- **Build URL**: Direct link to Jenkins build logs

  "timezone": "Asia/Bangkok",

  "repository": {#### Webhook Payload Example

    "url": "https://github.com/SanctuaryV/community-platform-plus-frontend.git",```json

    "branch": "main"{

  }  "jobName": "frontend-build",

}  "buildNumber": "45",

```  "jobResult": "SUCCESS",

  "isSuccess": true,

## 🐳 Docker Support  "triggeredBy": "developer-name",

  "startTime": "2025-10-02 15:30:00",

### Build Image  "endTime": "2025-10-02 15:33:00",

```bash  "timezone": "Asia/Bangkok",

docker build -t community-platform-frontend .  "repository": {

```    "url": "https://github.com/SanctuaryV/community-platform-plus-frontend.git",

    "branch": "main"

### Run Container  },

```bash  "parameters": {

docker run -p 3000:3000 community-platform-frontend    "imageName": "community-platform-plus-frontend",

```    "runCheckmarx": false,

    "pushToGar": true

### Environment Variables  }

```bash}

REACT_APP_API_URL=https://api.example.com```

REACT_APP_ENV=production

```### Pipeline Parameters

- `REPO_URL`: Git repository URL

## 🔒 Security- `REPO_BRANCH`: Branch to build (default: main)

- `IMAGE_NAME_FRONTEND`: Docker image name

- **SAST Scanning**: Checkmarx integration for vulnerability detection- `N8N_WEBHOOK_URL`: n8n webhook endpoint for notifications

- **Dependency Scanning**: Regular security updates- `Run_Checkmarx`: Enable/disable security scanning

- **SSL/TLS**: Secure communication protocols- `PushToGar`: Enable/disable push to Google Artifact Registry

- **Authentication**: Secure user authentication system

## Docker Support

## 🌍 Internationalization

This application can be containerized using Docker. The Jenkins pipeline automatically builds Docker images for deployment.

- **Primary Language**: English

- **Timezone**: Asia/Bangkok (UTC+7)## Security

- **Date Format**: YYYY-MM-DD HH:mm:ss

- Checkmarx SAST scanning integration for security vulnerability detection

## 📊 Monitoring & Analytics- SSL certificate handling for secure webhook communications

- Environment-based configuration management

- **Build Notifications**: Real-time webhook integration

- **Error Tracking**: Comprehensive logging system## Development Team

- **Performance Monitoring**: Build time and deployment metrics

- **Repository**: SanctuaryV/community-platform-plus-frontend

## 🛠️ Development Guidelines- **Branch**: n8n/webhook (current development branch)

- **Timezone**: Asia/Bangkok (UTC+7)

### Code Standards
- ESLint configuration for code quality
- Prettier for code formatting
- Component-based architecture
- Responsive design principles

### Git Workflow
- **Main Branch**: `main` (production-ready)
- **Feature Branches**: `feature/feature-name`
- **Development Branch**: `n8n/webhook` (current)

## 📚 Tech Stack

- **Frontend Framework**: React 18+
- **UI Library**: Material-UI
- **Build Tool**: Create React App
- **Containerization**: Docker
- **CI/CD**: Jenkins
- **Notification**: n8n webhooks
- **Security**: Checkmarx SAST

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- **Repository**: [SanctuaryV/community-platform-plus-frontend](https://github.com/SanctuaryV/community-platform-plus-frontend)
- **Issues**: GitHub Issues tab
- **Documentation**: This README and inline code comments

## 🔄 Recent Updates

- ✅ n8n webhook integration for build notifications
- ✅ Bangkok timezone support for all timestamps
- ✅ Enhanced security scanning with Checkmarx
- ✅ Docker containerization support
- ✅ Google Artifact Registry integration

## 📈 Project Status

- **Status**: Active Development
- **Version**: Latest
- **Last Updated**: October 2025
- **Maintainer**: SanctuaryV Team

---

**Made with ❤️ by the SanctuaryV Team**