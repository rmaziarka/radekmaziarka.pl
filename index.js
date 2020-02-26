'use strict';

/***
    Usage: blog2md b|w <BLOGGER/WordPress BACKUP XML> <OUTPUT DIR>

*/


const fs = require('fs');
const os = require('os');
const path = require('path');
const xml2js = require('xml2js');
const TurndownService = require('turndown');
var moment = require('moment');

var tds = new TurndownService({ codeBlockStyle: 'fenced', fence: '```' })

tds.addRule('wppreblock', {
    filter: ['pre'],
    replacement: function(content) {
        return '```\n' + content + '\n```'
    }
})

// console.log(`No. of arguments passed: ${process.argv.length}`);

if (process.argv.length < 5){
    // ${process.argv[1]}
    console.log(`Usage: blog2md [b|w] <BACKUP XML> <OUTPUT DIR> m|s`)
    console.log(`\t b for parsing Blogger(Blogspot) backup`);
    console.log(`\t w for parsing WordPress backup`);
    return 1;
}

var option = process.argv[2];
var inputFile =  process.argv[3];

var outputDir = process.argv[4];

var mergeComments = (process.argv[5] == 'm')?'m':'s' ;



if (fs.existsSync(outputDir)) {
    console.log(`WARNING: Given output directory "${outputDir}" already exists. Files will be overwritten.`)
}
else{
    fs.mkdirSync(outputDir);
}


if (mergeComments == 'm'){
    console.log(`INFO: Comments requested to be merged along with posts. (m)`);
}
else{
    console.log(`INFO: Comments requested to be a separate .md file(m - default)`);
}



if( option.toLowerCase() == 'b'){
    bloggerImport(inputFile, outputDir);
}
else if(option.toLowerCase() == 'w'){
    wordpressImport(inputFile, outputDir);
}
else {
    console.log('Only b (Blogger) and w (WordPress) are valid options');
    return;
}





function wordpressImport(backupXmlFile, outputDir){
    var parser = new xml2js.Parser();

    fs.readFile(backupXmlFile, function(err, data) {
        parser.parseString(data, function (err, result) {
            if (err) {
                console.log(`Error parsing xml file (${backupXmlFile})\n${JSON.stringify(err)}`); 
                return 1;
            }
            // console.dir(result); 
            // console.log(JSON.stringify(result)); return;
            var posts = [];
            
            // try {
                posts = result.rss.channel[0].item;
                
                console.log(`Total Post count: ${posts.length}`);

                posts = posts.filter(function(post){
                    var status = '';
                    if(post["wp:status"]){
                        status = post["wp:status"].join(''); 
                    }
                    // console.log(post["wp:status"].join(''));
                    return status != "private" && status != "inherit" 
                });


                // console.log(posts)
                console.log(`Post count: ${posts.length}`);

                var title = '';
                var slug = '';
                var content = '';
                var tags = [];
                var categoryName = '';
                var published = '';
                var comments = [];
                var fname = '';
                var markdown = '';
                var fileContent = '';
                var fileHeader = '';
                var postMaps = {};
                
                posts.forEach(function(post){
                    var postMap = {};

                    title = post.title[0].trim();
                    slug = post.link[0].trim().replace('https://radekmaziarka.pl','');
                    
                    // console.log(title);

                    // if (title && title.indexOf("'")!=-1){
                    title = title.replace(/'/g, "''");
                    // }

                    published = post.pubDate;
                    comments = post['wp:comment'];
                    fname = post["wp:post_name"][0] || post["wp:post_id"];
                    markdown = '';
                    // if (post.guid && post.guid[0] && post.guid[0]['_']){
                    //     fname = path.basename(post.guid[0]['_']);
                    // }
                    // console.log(comments);

                    console.log(`\n\n\n\ntitle: '${title}'`);
                    console.log(`published: '${published}'`);
                    
                    if (comments){
                        console.log(`comments: '${comments.length}'`);    
                    }
                    
                    tags = [];

                    var categories = post.category;
                    var tagString = '';

                    if (categories && categories.length){
                        categories.forEach(function (category){

                            if(category.$.domain === 'post_tag')
                                tags.push(category['_']);
                            else if (category.$.domain === 'category')
                                categoryName = category['_'];
                        });

                        // console.log(tags.join(", "));
                        // tags = tags.join(", ");
                        tagString = 'tags: [\'' + tags.join("', '") + "']\n";
                        // console.log(tagString);
                    }

                    var pmap = {fname:'', comments:[]};
                    pmap.fname = outputDir+'/'+fname+'-comments.md';

                    fname = outputDir+'/'+fname+'.md';
                    pmap.postName = fname;
                    console.log(`fname: '${fname}'`);
                    
                    if (post["content:encoded"]){
                        // console.log('content available');
                        content = '<div>'+post["content:encoded"]+'</div>'; //to resolve error if plain text returned
                        markdown = tds.turndown(content);
                        // console.log(markdown);

                        fileHeader = `---\ntitle: '${title}'\nslug: '${slug}'\ndate: ${published}\ndraft: false\ncategory: '${categoryName}'\n${tagString}---\n`;
                        fileContent = `${fileHeader}\n${markdown}`;
                        pmap.header = `${fileHeader}\n`;

                        // fileContent = `---\ntitle: '${title}'\ndate: ${published}\ndraft: false\n${tagString}---\n\n${markdown}`;

                        writeToFile(fname, fileContent);
                        
                    }

                    //comments:
                    /*
                        "wp:comment" [.each]
                            wp:comment_author[0]
                            wp:comment_author_email[0]
                            wp:comment_author_url[0]
                            wp:comment_date[0]
                            wp:comment_content[0]
                            wp:comment_approved[0] == 1
                        wp:post_id

                    */
                    var comments = post["wp:comment"] || [];
                    // console.dir(comments);
                    var anyApprovedComments = 0;
                    var ccontent = '';
                    comments.forEach(function(comment){
                        // console.log('')
                        if(comment["wp:comment_approved"].pop()){
                            anyApprovedComments = 1;

                            var cmt = {title:'', published:'', content:'', author:{}};

                            cmt.published = (comment["wp:comment_date"]?comment["wp:comment_date"].pop():'');

                            var cont = '<div>'+comment["wp:comment_content"].pop()+'</div>';
                            cmt.content = (comment["wp:comment_content"]?tds.turndown(cont):'');

                            cmt.author.name = (comment["wp:comment_author"]?comment["wp:comment_author"].pop():'');
                            cmt.author.email = (comment["wp:comment_author_email"]?comment["wp:comment_author_email"].pop():'');
                            cmt.author.url = (comment["wp:comment_author_url"]?comment["wp:comment_author_url"].pop():'');

                            ccontent += `#### [${cmt.author.name}](${cmt.author.url} "${cmt.author.email}") - ${cmt.published}\n\n${cmt.content}\n<hr />\n`;

                            pmap.comments.push(cmt);
                        }
                    });

                    //just a hack to re-use blogger writecomments method
                    if (pmap && pmap.comments && pmap.comments.length){
                        writeComments({"0": pmap});
                    }

                });

        });
    });

}

function writeComments(postMaps){

    if (mergeComments == 'm'){
        console.log('DEBUG: merge comments requested');
    }else{
        console.log('DEBUG: separate comments requested (defaulted)');
    }
    for (var pmap in postMaps){
        var comments = postMaps[pmap].comments;
        console.log(`post id: ${pmap} has ${comments.length} comments`);
        // console.dir(comments);

        if (comments.length){
            var ccontent = '';
            comments.forEach(function(comment){
                var readableDate = '<time datetime="'+comment.published+'">' + moment(comment.published).format("MMM d, YYYY") + '</time>';

                ccontent += `#### ${comment.title}\n[${comment.author.name}](${comment.author.url} "${comment.author.email}") - ${readableDate}\n\n${comment.content}\n<hr />\n`;
            });

            if (mergeComments == 'm'){
                writeToFile(postMaps[pmap].postName, `\n---\n### Comments:\n${ccontent}`, true);
            }else{
                writeToFile(postMaps[pmap].fname, `${postMaps[pmap].header}\n${ccontent}`);
            }
            
        }
    }
}



function writeToFile(filename, content, append=false){

    if(append){
        console.log(`DEBUG: going to append to ${filename}`);
        try{
            fs.appendFileSync(filename, content);
            console.log(`Successfully appended to ${filename}`);
        }
        catch(err){
            console.log(`Error while appending to ${filename} - ${JSON.stringify(err)}`);
            console.dir(err);
        }

    }else{
        console.log(`DEBUG: going to write to ${filename}`);
        try{
            fs.writeFileSync(filename, content);
            console.log(`Successfully written to ${filename}`);
        }
        catch(err){
            console.log(`Error while writing to ${filename} - ${JSON.stringify(err)}`);
            console.dir(err);
        }
    }
    
}
