// Frontend Logger Utility
// src/utils/logger.js

class FrontendLogger {
  static component(name, action, data = null) {
    console.log(`\n🎨 [${name}] ${action}`);
    console.log('⏰ Time:', new Date().toLocaleTimeString());
    if (data) {
      console.log('📊 Data:', data);
    }
  }

  static event(component, eventName, data = null) {
    console.log(`\n⚡ [EVENT] ${component} - ${eventName}`);
    if (data) {
      console.log('📊 Event Data:', data);
    }
  }

  static navigation(from, to) {
    console.log(`\n🧭 [NAVIGATION] ${from} → ${to}`);
    console.log('⏰ Time:', new Date().toLocaleTimeString());
  }

  static state(component, stateName, value) {
    console.log(`\n📝 [STATE] ${component}.${stateName} =`, value);
  }

  static error(component, message, error = null) {
    console.error(`\n❌ [ERROR] ${component}: ${message}`);
    if (error) {
      console.error('Error details:', error);
    }
  }

  static success(component, message, data = null) {
    console.log(`\n✅ [SUCCESS] ${component}: ${message}`);
    if (data) {
      console.log('📊 Data:', data);
    }
  }

  static socket(event, data = null) {
    console.log(`\n🔌 [SOCKET] Event: ${event}`);
    console.log('⏰ Time:', new Date().toLocaleTimeString());
    if (data) {
      console.log('📊 Data:', data);
    }
  }

  static auth(action, data = null) {
    console.log(`\n🔐 [AUTH] ${action}`);
    console.log('⏰ Time:', new Date().toLocaleTimeString());
    if (data) {
      const sanitized = { ...data };
      if (sanitized.password) sanitized.password = '***';
      if (sanitized.token) sanitized.token = sanitized.token.substring(0, 20) + '...';
      console.log('📊 Data:', sanitized);
    }
  }

  static render(component, props = null) {
    if (process.env.REACT_APP_ENABLE_DEBUG === 'true') {
      console.log(`\n🎨 [RENDER] ${component}`);
      if (props) {
        console.log('Props:', props);
      }
    }
  }
}

export default FrontendLogger;
