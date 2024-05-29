import React from 'react';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { titleStyle } from './styles.ts';
import { ArticleModel } from '../../../../models/article-model.ts';

const Content: React.FC<{ article: ArticleModel }> = ({ article }) => {
  return (
    <div>
      <Container>
        <Typography
          variant="h4"
          noWrap
          component="div"
          style={{ ...titleStyle }}
        >
          {article.title}
        </Typography>

        <ReactMarkdown className="markdown">{article.content}</ReactMarkdown>
      </Container>
    </div>
  );
};

export default Content;
