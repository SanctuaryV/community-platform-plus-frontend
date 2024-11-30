module.exports = {
    presets: [
      '@babel/preset-env',  // แปลงโค้ด ES6+
      '@babel/preset-react' // แปลงโค้ด JSX
    ],
    plugins: [
      '@babel/plugin-transform-modules-commonjs'  // แปลง module ให้เป็น CommonJS
    ]
  };
  