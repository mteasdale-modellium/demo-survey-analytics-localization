import * as Survey from 'survey-angular';
import * as SurveyAnalytics from 'survey-analytics';
import { cloneDeep } from 'lodash';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @Input() json: any;
  @Input() id: string;

  constructor(
  ) { }

  ngOnInit() {
    SurveyAnalytics.localization.defaultLocaleValue = 'fr';
    SurveyAnalytics.localization.currentLocaleValue = 'fr';
    SurveyAnalytics.localization.currentLocale = 'fr';
    // You can see here that the currentLocale is never updated. It seems to be the string used by Plotly as the locale to use.
    console.log(cloneDeep(SurveyAnalytics.localization));
  }

  ngAfterViewInit() {
    const survey = new Survey.Model({
      "locale": "fr",
      "questions": [
        {
          "type": "dropdown",
          "name": "satisfaction",
          "title": "Êtes-vous satisfait du produit?",
          "choices": [
            "Pas satisfait",
            "Satisfait",
            "Complètement satisfait"
          ]
        }
      ]
    });

    const choices = [
      "Pas satisfait",
      "Satisfait",
      "Complètement satisfait"
    ];

    const allQuestions = survey.getAllQuestions();

    function randomIntFromInterval(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const data = [];

    // We show random data in this example
    for (let index = 0; index < 10; index++) {
      data.push({
        satisfaction: choices[randomIntFromInterval(0, 2)]
      });
    }

    const surveyResultNode = document.getElementById("surveyResult");

    const visPanel = new SurveyAnalytics.VisualizationPanel(allQuestions, data, {
      allowDynamicLayout: false,
      labelTruncateLength: 27,
      allowHideQuestions: false,
      survey: survey
    });

    // On render le SurveyAnalytics
    visPanel.render(surveyResultNode);
  }

}
