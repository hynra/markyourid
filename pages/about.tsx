import React from "react";
import {NextSeo} from "next-seo";
import MainLayout from "../components/main_layout";
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'

const About: React.FC<{source: any}> = ({ source }) => {
    return(
        <div>
            <NextSeo
                title="MarkYourID - About"
                description="MarkYourID protects online identity card submissions by making a copy of the submission as an NFT and minting it on the Blockchain"
            />
            <MainLayout path='/about' address={null}>
                <MDXRemote {...source} />
            </MainLayout>
        </div>
    )
}


export async function getStaticProps() {
    // MDX text - can be from a local file, database, anywhere
    const sc = require('fs').readFileSync('./static/about.md').toString()
    const source = sc;
    const mdxSource = await serialize(source)
    return { props: { source: mdxSource } }
}

export default About;
