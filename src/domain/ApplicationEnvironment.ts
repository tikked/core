import '../utility/ArrayExtensions';
import { validateIsNotEmpty, validateUniqueIds } from '../utility/Validators';
import { Context } from './Context';
import { ContextSchema } from './ContextSchema';
import { FeatureFlag } from './FeatureFlag';
import { Identifiable } from './Identifiable';

export class ApplicationEnvironment implements Identifiable {
  private featureFlags: FeatureFlag[];

  constructor(
    private id: string,
    private name: string,
    private description: string,
    private contextSchema: ContextSchema,
    featureFlags: FeatureFlag[]
  ) {
    validateUniqueIds(featureFlags);
    validateIsNotEmpty(id, 'Id should be non-empty');

    this.featureFlags = [...featureFlags];
  }

  get Id() {
    return this.id;
  }

  get Name() {
    return this.name;
  }

  get Description() {
    return this.description;
  }

  get ContextSchema() {
    return this.contextSchema;
  }

  get FeatureFlags(): ReadonlyArray<FeatureFlag> {
    return this.featureFlags;
  }

  /**
   * Finds the feature set that matches the given context
   * @param context The context to find relevant feature set for
   */
  public getFeatureSet(context: Context): FeatureSet {
    const filteredContext = this.contextSchema.filterContext(context);
    const activeFeatureFlags = this.featureFlags.filter(ff => {
      const toggles = ff.getToggles(filteredContext);
      return this.contextSchema.getMostRelevant(toggles).IsActive;
    });
    return new Set<string>(activeFeatureFlags.map(ff => ff.Id));
  }
}

type FeatureSet = Set<string>;
