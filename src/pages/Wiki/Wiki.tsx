import React, { useEffect, useState } from 'react';
// import Footer from '../../components/Footer/Footer.tsx';
import { containerStyle } from './styles.ts';
import PageWrap from './components/PageWrap/PageWrap.tsx';
import { createTheme, ThemeProvider } from '@mui/material';
import { ThemeOptions } from '../../constants.ts';
import { getAllArticle } from '../../repositories/wiki/article-repository.ts';
import { ArticleModel } from '../../models/article-model.ts';
import StateEnum from '../../common/enums/state-enum.ts';
import GenericLoading from '../../common/components/GenericLoading.tsx';
import { ArticleCategoryModel } from '../../models/article-category-model.ts';
import { getAllArticleCategory } from '../../repositories/wiki/article-category-repository.ts';
import { GroupedArticlesModel } from '../../models/grouped-articles-model.ts';

const Wiki: React.FC = () => {
  const [state, setState] = useState<StateEnum>(StateEnum.LOADING);

  const [theme, setTheme] = useState<ThemeOptions>(
    (localStorage.getItem('theme') as ThemeOptions) ?? 'light',
  );

  const customTheme = createTheme({
    palette: {
      mode: theme,
    },
  });

  const [groupedArticles, setGroupedArticles] = useState<
    GroupedArticlesModel[]
  >([]);

  const fetchData = async () => {
    const articleData = (await getAllArticle()) as ArticleModel[];
    const articleCategoryData =
      (await getAllArticleCategory()) as ArticleCategoryModel[];

    articleData.sort((a, b) => a.position - b.position);
    articleCategoryData.sort((a, b) => a.position - b.position);

    const groupedArticles: GroupedArticlesModel[] = articleCategoryData.map(
      (item) => {
        return {
          articleCategory: item,
          articles: articleData.filter((a) => a.category === item.id),
        };
      },
    );

    setGroupedArticles(groupedArticles);
  };

  useEffect(() => {
    setState(StateEnum.LOADING);
    fetchData()
      .then(() => {
        setState(StateEnum.DEFAULT);
      })
      .catch((error) => {
        console.log(error);
        setState(StateEnum.ERROR);
      });
  }, []);

  return (
    <div style={{ ...containerStyle }}>
      <ThemeProvider theme={customTheme}>
        {
          {
            [StateEnum.LOADING]: <GenericLoading />,
            [StateEnum.DEFAULT]: (
              <PageWrap
                theme={theme}
                setTheme={setTheme}
                groupedArticles={groupedArticles}
              />
            ),
            [StateEnum.ERROR]: <div>error</div>,
          }[state]
        }
      </ThemeProvider>
    </div>
  );
};

export default Wiki;
