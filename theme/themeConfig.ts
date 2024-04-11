import type { ThemeConfig } from 'antd';
import { theme } from 'antd'

const appTheme: ThemeConfig = {
  // algorithm: [theme.compactAlgorithm],
  token: {
    borderRadius: 3,
    fontSize: 12,
    // fontFamily: 'Open Sans',
   // // colorPrimary: '#52c41a',
    // colorPrimary: '#0085ff',
  },
  components: {
    Segmented: {
      // itemSelectedBg:'#0085FF',
      itemSelectedColor:'#0085FF'
    },
  }
};

export default appTheme;