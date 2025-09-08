#!/usr/bin/env node
const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");
const { removeSync, copySync } = require("fs-extra");

const projectName = "ssu-p5-js";
const currentPath = process.cwd();
const isCurrentPathProject = projectName === ".";

const tempPath = path.join(currentPath, "temp");
const projectPath = isCurrentPathProject
  ? currentPath
  : path.join(currentPath, projectName);

const GIT_REPO = "https://github.com/AshtonYoon/ssu-p5-js-boilerplate.git";

// project-name 입력시
if (!isCurrentPathProject) {
  try {
    fs.mkdirSync(projectPath);
  } catch (err) {
    if (err.code === "EXIST") {
      console.log(
        `[ERROR]: The file ${projectName} already exist in the current directory.`
      );
    } else {
      console.log(error);
    }
    process.exit(1);
  }
}

async function generator() {
  try {
    console.log("[INFO]: 템플릿 다운로드 중...");
    execSync(`git clone ${GIT_REPO} ${tempPath}`);

    console.log("[INFO]: 파일 복사 중...");
    copySync(`${tempPath}/react-boilerplate`, projectPath);

    removeSync(tempPath);

    console.log("[INFO]: 경로 생성 중...");
    if (!isCurrentPathProject) {
      process.chdir(projectPath);
    }

    console.log("[SUCCESS]: 다운로드 완료!");
  } catch (error) {
    console.log(error);
  }
}

generator();
