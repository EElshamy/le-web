<template>
  <svg
    width="103"
    height="83"
    viewBox="0 0 103 83"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.04883 31.0625H25.8539"
      stroke="#76003E"
      stroke-width="3.43035"
      stroke-miterlimit="10"
    />
    <path
      d="M0.230469 41.5059H22.4375"
      stroke="#76003E"
      stroke-width="3.43035"
      stroke-miterlimit="10"
    />
    <path
      d="M83.9668 0.615234H37.7039C32.83 0.615234 28.8789 4.56634 28.8789 9.44027V73.5554C28.8789 78.4293 32.83 82.3804 37.7039 82.3804H83.9668C88.8407 82.3804 92.7918 78.4293 92.7918 73.5554V9.44027C92.7918 4.56634 88.8407 0.615234 83.9668 0.615234Z"
      fill="#FCDED2"
    />
    <path
      d="M42.332 20.6211H78.6938"
      stroke="#76003E"
      stroke-width="3.43035"
      stroke-miterlimit="10"
    />
    <path
      d="M42.332 31.0635H78.6938"
      stroke="#76003E"
      stroke-width="3.43035"
      stroke-miterlimit="10"
    />
    <path
      d="M42.332 41.5059H65.2251"
      stroke="#76003E"
      stroke-width="3.43035"
      stroke-miterlimit="10"
    />
    <path
      d="M83.9881 72.9351C92.667 72.9351 99.7027 65.8994 99.7027 57.2205C99.7027 48.5415 92.667 41.5059 83.9881 41.5059C75.3091 41.5059 68.2734 48.5415 68.2734 57.2205C68.2734 65.8994 75.3091 72.9351 83.9881 72.9351Z"
      fill="#FC8575"
      class="animated-icon-y"
    />
    <path
      d="M101.769 74.3942L91.2109 63.8359"
      stroke="#FC8575"
      stroke-width="3.29314"
      stroke-miterlimit="10"
      class="animated-icon-y"
    />
    <path
      d="M83.9896 66.8043C89.2823 66.8043 93.5729 62.5138 93.5729 57.221C93.5729 51.9283 89.2823 47.6377 83.9896 47.6377C78.6968 47.6377 74.4062 51.9283 74.4062 57.221C74.4062 62.5138 78.6968 66.8043 83.9896 66.8043Z"
      fill="#F27466"
      class="animated-icon-y"
    />
  </svg>
</template>

<style scoped>
.animated-icon {
  animation: float 2s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-12px);
  }
}

.animated-icon-y {
  animation: float-y 2s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-12px);
  }
}

@keyframes float-y {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.animated-icon-shake {
  animation: shake 3s infinite linear;
}

@keyframes shake {
  0% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(-3px, 0);
  }
  50% {
    transform: translate(3px, 0);
  }
  75% {
    transform: translate(-3px, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}
</style>
