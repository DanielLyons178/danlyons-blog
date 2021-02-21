import Head from "next/head";
import React from "react";
import styles from "../../public/styles/content.module.css";
import Author from "../components/Author";
import Copyright from "../components/Copyright";
import Date from "../components/Date";
import Layout from "../components/Layout";
import BasicMeta from "../components/meta/BasicMeta";
import JsonLdMeta from "../components/meta/JsonLdMeta";
import OpenGraphMeta from "../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../components/meta/TwitterCardMeta";
import { SocialList } from "../components/SocialList";
import TagButton from "../components/TagButton";
import { getAuthor } from "../lib/authors";
import { getTag } from "../lib/tags";

type Props = {
  title: string;
  date: Date;
  slug: string;
  description: string;
  tags: string[];
  author: string;
};
export default function Index({
  title,
  date,
  slug,
  author,
  tags,
  description,
}: Props) {
  const keywords = tags.map((it) => getTag(it).name);
  const authorName = getAuthor(author).name;
  return ({ children: content }) => {
    return (
      <Layout>
        <BasicMeta
          url={`/posts/${slug}`}
          title={title}
          keywords={keywords}
          description={description}
        />
        <TwitterCardMeta
          url={`/posts/${slug}`}
          title={title}
          description={description}
        />
        <OpenGraphMeta
          url={`/posts/${slug}`}
          title={title}
          description={description}
        />
        <JsonLdMeta
          url={`/posts/${slug}`}
          title={title}
          keywords={keywords}
          date={date}
          author={authorName}
          description={description}
        />
        <div className={"container"}>
          <article>
            <header>
              <h1>{title}</h1>
              <div className={"metadata"}>
                <div>
                  <Date date={date} />
                </div>
                <div>
                  <Author author={getAuthor(author)} />
                </div>
              </div>
            </header>
            <div className={styles.content}>{content}</div>
            <ul className={"tag-list"}>
              {tags.map((it, i) => (
                <li key={i}>
                  <TagButton tag={getTag(it)} />
                </li>
              ))}
            </ul>
          </article>
          <footer>
            <div className={"social-list"}>
              <SocialList />
            </div>
            <Copyright />
          </footer>
        </div>
        <style jsx>
          {`
            .container {
              display: block;
              max-width: 70rem;
              width: 100%;
              margin: 0 auto;
              padding: 0 1.5rem;
              box-sizing: border-box;
            }
            .metadata div {
              display: inline-block;
              margin-right: 0.5rem;
            }
            article {
              flex: 1 0 auto;
            }
            h1 {
              margin: 0 0 0.5rem;
              font-size: 2.25rem;
            }
            .tag-list {
              list-style: none;
              text-align: right;
              margin: 1.75rem 0 0 0;
              padding: 0;
            }
            .tag-list li {
              display: inline-block;
              margin-left: 0.5rem;
            }
            .social-list {
              margin-top: 3rem;
              text-align: center;
            }

            @media (min-width: 769px) {
              .container {
                display: flex;
                flex-direction: column;
              }
            }
          `}
        </style>

      </Layout>
    );
  };
}
