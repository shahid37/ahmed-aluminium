const ReducersProps = (state) => {
  return {
    language: state.languageReducer.language,
    theme: state.themeReducer.theme,
  };
};

export default ReducersProps;
