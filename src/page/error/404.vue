<template>
<body>
  <table cellspacing="0" cellpadding="0">
    <tr>
      <td>
        <table cellspacing="0" cellpadding="0">
          <tr>
            <td>
              <h1>404</h1>
              <h3>大事不妙啦！</h3>
              <p>你访问的页面不存在~<br />
                <a href="javascript: window.history.back()">返回 ></a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</template>
<style scoped>
    * {
      font-family: "Microsoft Yahei";
      margin: 0;
      font-weight: lighter;
      text-decoration: none;
      text-align: center;
      line-height: 2.2em;
    }

    html,
    body {
      height: 100%;
    }

    h1 {
      font-size: 100px;
      line-height: 1em;
    }

    table {
      width: 100%;
      height: 100%;
      border: 0;
    }
  </style>
<script>
export default {
}
</script>
